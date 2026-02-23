<?php

namespace App\DataFixtures;

use App\Entity\Pedido;
use App\Entity\Plato;
use App\Entity\PlatoPedido;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;
    private HttpClientInterface $httpClient;

    public function __construct(UserPasswordHasherInterface $hasher, HttpClientInterface $httpClient)
    {
        $this->hasher = $hasher;
        $this->httpClient = $httpClient;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('es_ES');

        // Check if there are any existing Platos to use them, if not fetch from TheMealDB
        $existingPlatos = $manager->getRepository(Plato::class)->findAll();
        $platos = $existingPlatos;

        if (empty($platos)) {
            // Fetch 10+ real meals from TheMealDB starting with 'b' (e.g. Beef, Baked Salmon...)
            $response = $this->httpClient->request('GET', 'https://www.themealdb.com/api/json/v1/1/search.php?f=b');
            $data = $response->toArray();
            $meals = array_slice($data['meals'] ?? [], 0, 10);

            foreach ($meals as $meal) {
                $plato = new Plato();
                $plato->setNombre($meal['strMeal']);
                $plato->setOrigen($meal['strArea']);
                // The API doesn't provide a price, so we generate a realistic restaurant price
                $plato->setPrecio((string) $faker->randomFloat(2, 8, 28));
                $plato->setUrlImg($meal['strMealThumb']);
                $plato->setApiId($meal['idMeal']);

                $manager->persist($plato);
                $platos[] = $plato;
            }
            // Flush platos so they have IDs before we link them
            $manager->flush();
        }

        // Generate 5 fake users
        for ($i = 0; $i < 5; $i++) {
            $user = new User();
            $email = $i === 0 ? 'test@demo.com' : $faker->unique()->email();
            $user->setEmail($email);

            // Fixed password for easier testing: "123456"
            $password = $this->hasher->hashPassword($user, '123456');
            $user->setPassword($password);

            $user->setNombre($faker->name());

            $telefono = str_replace(' ', '', $faker->phoneNumber());
            $user->setTelefono(substr($telefono, 0, 20));
            $user->setDireccion($faker->address());
            $user->setRoles(['ROLE_USER']);

            $manager->persist($user);

            // Give each user 1 to 4 random past Orders
            $numPedidos = $faker->numberBetween(1, 4);
            for ($j = 0; $j < $numPedidos; $j++) {
                $pedido = new Pedido();
                $pedido->setIdUser($user);
                $pedido->setDireccionEnvio($faker->randomElement([$user->getDireccion(), $faker->address()]));
                $pedido->setMetodoPago($faker->randomElement(['Tarjeta de Crédito', 'PayPal', 'Efectivo contrareembolso', 'Google Pay']));

                $manager->persist($pedido);

                // Add 2 to 5 items to this order
                $numPlatos = $faker->numberBetween(2, 5);
                $selectedPlatos = $faker->randomElements($platos, $numPlatos, false);

                foreach ($selectedPlatos as $plato) {
                    $item = new PlatoPedido();
                    $item->setIdPedido($pedido);
                    $item->setIdPlato($plato);
                    $item->setCantidadPlato($faker->numberBetween(1, 4));
                    $manager->persist($item);
                }
            }
        }

        $manager->flush();
    }
}
