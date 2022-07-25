<?php

namespace App\Security\Voter;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class MessageVoter extends Voter
{
    public const EDIT = 'MESSAGE_EDIT';
    public const POST = 'MESSAGE_POST';
    public const VIEW = 'MESSAGE_VIEW';
    public const PATCH = 'MESSAGE_PATCH';

    private Security $security;
    private EntityManagerInterface $em;

    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }

    protected function supports(string $attribute, $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::EDIT, self::VIEW, self::POST, self::PATCH])
            && $subject instanceof Message;
    }

    /** @var Message $subject */
    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {

        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof User) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::EDIT:
                if($this->security->isGranted("ROLE_ADMIN"))
                    return true;
                break;
            case self::VIEW:
                if($this->security->isGranted("ROLE_USER") )
                    return true;
                break;
            case self::POST:
                if($subject->getTicket()->getStatus()->getName() != "unsolved")
                    return false;
                $messages = $user->getTickets();
                if($this->security->isGranted("ROLE_ADMIN") || ($messages->contains($subject->getTicket())))
                    return true;
                break;
            case self::PATCH:
                if ($subject->isIsRead() == true)
                    return false;
                $messages = $user->getTickets();

                if((
                    $this->security->isGranted("ROLE_ADMIN")
                        && !in_array("ROLE_ADMIN", $subject->getOwner()->getRoles())
                    ) || (
                        $messages->contains($subject->getTicket())
                        && in_array("ROLE_ADMIN", $subject->getOwner()->getRoles())
                    )
                )
                    return true;
        }

        return false;
    }
}
