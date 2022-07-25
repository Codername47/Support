<?php

namespace App\Doctrine;

use App\Entity\Message;
use Symfony\Component\Security\Core\Security;

class MessageSetOwnerListener
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function prePersist(Message $message)
    {
        if ($message->getOwner()) {
            return;
        }
        if ($this->security->getUser()) {
            $message->setOwner($this->security->getUser());
        }
    }
}