<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;
    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {

        $user = new User();
        $user->setRoles(["ROLE_ADMIN"]);
        $user->setUsername("admin");
        $user->setPassword($this->passwordHasher->hashPassword($user, "admin"));


        // $product = new Product();
        // $manager->persist($product);
        $manager->persist($user);
        $manager->flush();
    }
}
