<?php

namespace App\DataFixtures;

use App\Entity\TicketStatus;
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

        $unsolved = new TicketStatus();
        $unsolved->setName("unsolved");

        $frozen = new TicketStatus();
        $frozen->setName("frozen");

        $solved = new TicketStatus();
        $solved->setName("solved");



        // $product = new Product();
        // $manager->persist($product);
        $manager->persist($user);
        $manager->persist($unsolved);
        $manager->persist($frozen);
        $manager->persist($solved);
        $manager->flush();
    }
}
