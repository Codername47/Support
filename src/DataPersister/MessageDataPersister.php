<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Message;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class MessageDataPersister implements DataPersisterInterface
{
    private EntityManagerInterface $em;
    private Security $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->security = $security;
        $this->em = $em;
    }
    public function supports($data): bool
    {
        return $data instanceof Message;
    }

    /**
     * @param Message $data
     */
    public function persist($data)
    {
        if(!$data->isIsRead())
            $data->setIsRead(false);
        if(!$data->getOwner())
            $data->setOwner($this->security->getUser());
        $ticket = $data->getTicket();
        if(!$data->getDateSend())
            $data->setDateSend(new \DateTime('now'));
        $ticket->setDateUpdate(new \DateTime('now'));
        $this->em->persist($ticket);
        $this->em->persist($data);
        $this->em->flush();
    }

    public function remove($data)
    {
        // TODO: Implement remove() method.
    }

}