<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Ticket;
use App\Entity\TicketStatus;
use Doctrine\ORM\EntityManagerInterface;

class TicketDataPersister implements DataPersisterInterface
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function supports($data): bool
    {
        return $data instanceof Ticket;
    }

    /**
     * @param Ticket $data
     */
    public function persist($data)
    {
        if (!$data->getStatus())
        {
            $status = $this->em->getRepository(TicketStatus::class)->findOneBy(['name' => 'unsolved']);
            $data->setStatus($status);
        }
        $this->em->persist($data);
        $this->em->flush();
    }

    public function remove($data)
    {
        // TODO: Implement remove() method.
    }

}