<?php

namespace App\Controller;

use App\Entity\Pedido;
use App\Entity\Plato;
use App\Entity\PlatoPedido;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api')]
class ApiController extends AbstractController
{
    private HttpClientInterface $httpClient;
    private EntityManagerInterface $entityManager;

    public function __construct(HttpClientInterface $httpClient, EntityManagerInterface $entityManager)
    {
        $this->httpClient = $httpClient;
        $this->entityManager = $entityManager;
    }

    #[Route('/meals/{endpoint}', name: 'api_meals', requirements: ['endpoint' => '.+'], methods: ['GET'])]
    public function proxyMeals(string $endpoint, Request $request): JsonResponse
    {
        $queryString = $request->getQueryString();
        // Append .php automatically if not provided, to avoid Symfony dev server treating it as a raw file
        if (!str_ends_with($endpoint, '.php')) {
            $endpoint .= '.php';
        }
        $url = 'https://www.themealdb.com/api/json/v1/1/' . $endpoint;

        if ($queryString) {
            $url .= '?' . $queryString;
        }

        try {
            $response = $this->httpClient->request('GET', $url);
            $data = $response->toArray();

            // Inject consistent random prices into the meals
            if (isset($data['meals']) && is_array($data['meals'])) {
                foreach ($data['meals'] as &$meal) {
                    $id = (int) ($meal['idMeal'] ?? 0);
                    // Generate a consistent price between $8.00 and $24.99 based on ID
                    // Using primes to create pseudo-randomness: id * 13 modulo 17 gives 0-16
                    $priceBase = ($id * 13) % 17;
                    $cents = ($id * 23) % 100; // 0 to 99
                    $meal['precio'] = sprintf('%d.%02d', 8 + $priceBase, $cents);
                }
            }

            return new JsonResponse($data, $response->getStatusCode());
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error al contactar con TheMealDB: ' . $e->getMessage()], 500);
        }
    }

    #[Route('/orders', name: 'api_create_order', methods: ['POST'])]
    public function createOrder(Request $request): JsonResponse
    {
        $user = $this->getUser();
        /** @var \App\Entity\User $user */
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no autenticado'], 401);
        }

        $data = json_decode($request->getContent(), true);

        if (!isset($data['items']) || !is_array($data['items']) || empty($data['items'])) {
            return new JsonResponse(['error' => 'El pedido está vacío o los datos son inválidos'], 400);
        }

        $pedido = new Pedido();
        $pedido->setIdUser($user);
        // Validar si el frontend envía dirección y método de pago, en este caso pondremos unos por defecto
        // o los tomaremos del request si existen.
        $pedido->setDireccionEnvio($data['direccion_envio'] ?? $user->getDireccion() ?? 'Dirección no definida');
        $pedido->setMetodoPago($data['metodo_pago'] ?? 'Tarjeta');

        $this->entityManager->persist($pedido);

        $platoRepository = $this->entityManager->getRepository(Plato::class);

        foreach ($data['items'] as $item) {
            $apiId = (string) $item['idMeal'];

            // Buscar si el plato ya existe en nuestra BD
            $plato = $platoRepository->findOneBy(['api_id' => $apiId]);

            if (!$plato) {
                // Crear plato en nuestra base de datos para la relación
                $plato = new Plato();
                $plato->setApiId($apiId);
                $plato->setNombre($item['strMeal'] ?? 'Desconocido');
                $plato->setUrlImg($item['strMealThumb'] ?? '');
                $plato->setOrigen($item['strArea'] ?? 'Desconocido');
                $plato->setPrecio($item['precio'] ?? '10.00'); // Precio mock si la API no lo da
                $this->entityManager->persist($plato);
            }

            $platoPedido = new PlatoPedido();
            $platoPedido->setIdPedido($pedido);
            $platoPedido->setIdPlato($plato);
            $platoPedido->setCantidadPlato((int) ($item['cantidad'] ?? 1));

            $this->entityManager->persist($platoPedido);
        }

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Pedido creado exitosamente', 'order_id' => $pedido->getId()], 201);
    }

    #[Route('/orders/history', name: 'api_orders_history', methods: ['GET'])]
    public function getOrdersHistory(): JsonResponse
    {
        $user = $this->getUser();
        /** @var \App\Entity\User $user */
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no autenticado'], 401);
        }

        // Obtener historial usando Doctrine: User -> Pedidos -> PlatoPedidos -> Platos
        // Como las relaciones están configuradas en Entity, es directo.

        $historial = [];

        /** @var Pedido $pedido */
        foreach ($user->getPedidos() as $pedido) {
            $platosInfo = [];

            // Buscar los PlatoPedido asociados a este Pedido 
            // Como no hay relación ManyToOne mappedBy explícita en Pedido para PlatoPedido,
            // tenemos que buscar por repositorio si no la hemos mapeado.
            $platoPedidos = $this->entityManager->getRepository(PlatoPedido::class)->findBy(['id_pedido' => $pedido]);

            /** @var PlatoPedido $pp */
            foreach ($platoPedidos as $pp) {
                $plato = $pp->getIdPlato();
                $platosInfo[] = [
                    'plato_nombre' => $plato->getNombre(),
                    'plato_imagen' => $plato->getUrlImg(),
                    'cantidad' => $pp->getCantidadPlato(),
                    'precio_unitario' => $plato->getPrecio(),
                ];
            }

            $historial[] = [
                'order_id' => $pedido->getId(),
                'direccion_envio' => $pedido->getDireccionEnvio(),
                'metodo_pago' => $pedido->getMetodoPago(),
                'platos' => $platosInfo
            ];
        }

        return new JsonResponse(['history' => $historial]);
    }
}
