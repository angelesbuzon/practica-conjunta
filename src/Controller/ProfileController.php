<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ProfileController extends AbstractController
{
    #[Route('/api/profile', name: 'api_profile_update', methods: ['PUT'])]
    #[IsGranted('ROLE_USER')]
    public function updateProfile(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Invalid JSON payload'], Response::HTTP_BAD_REQUEST);
        }

        if (isset($data['nombre'])) {
            $user->setNombre($data['nombre']);
        }
        if (isset($data['telefono'])) {
            $user->setTelefono($data['telefono']);
        }
        if (isset($data['direccion'])) {
            $user->setDireccion($data['direccion']);
        }

        $entityManager->flush();

        return $this->json([
            'message' => 'Profile updated successfully',
            'id' => $user->getId(),
            'email' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
            'nombre' => $user->getNombre(),
            'telefono' => $user->getTelefono(),
            'direccion' => $user->getDireccion()
        ]);
    }
}
