<?php

namespace App\Controller;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonDecode;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\Encoder\JsonEncoder;


class RegisterController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $passwordHasher
    )
    {
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
    }


    #[Route('/register', name: 'app_register', methods: "post")]
    public function register(Request $request): Response
    {
        $client = HttpClient::create(['base_uri' => 'http://nginx']);
        $content = $request->toArray();
        $username = $content['username'];
        $password = $content['password'];
        $repeatPassword = $content['repeatPassword'];
        if ($repeatPassword != $password)
            return $this->json(["error" => "Пароли не совпадают"]);
        $res = $client->request("POST", '/auth',[
           'json' => [
               'username' => 'Codername47',
               'password' => '3094747zzz'
           ],
            'headers' => [
                'Accept'     => 'application/ld+json',
                'Content-Type'=> 'application/json',
            ]
        ]);
        $res1 = $res;
        $res = $client->request("POST", "/api/users", [
            'auth_basic' => ['Codername47', '3094747zzz'],
            'json' => [
                'username' => $username,
                'password' => $password
            ],
            'headers' => [
                'Accept'     => 'application/ld+json',
                'Content-Type'=> 'application/json',
            ]
        ]);
        return $this->json($res->getContent()) ;
    }
}
