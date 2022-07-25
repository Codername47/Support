<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController
{

    #[Route('/auth', name: 'app_auth')]
    public function auth(): Response
    {
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".'
            ], 400);
        }
        return $this->json([
                'user' => $this->getUser() ? $this->getUser() : null]
        );
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): Response {
        return $this->json(["error" => "Cannot be reached"], 400);
    }
}
