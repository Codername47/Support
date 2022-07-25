<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => ['security' => "is_granted('ROLE_ADMIN')"],
        'post' => ['security_post_denormalize' => "is_granted('MESSAGE_POST', object)"]
    ],

    itemOperations: [
        'get' => [ 'security' => "(is_granted('ROLE_USER') and object.owner == user) or is_granted('ROLE_ADMIN')"],
        'put' => ['security' => "is_granted('MESSAGE_EDIT, previous_object')"],
        'delete' => ['security' => "is_granted('MESSAGE_EDIT', object)"],
        'patch' => [
            'denormalization_context' => ['groups' => ['message:item:patch']],
            'security' => "is_granted('MESSAGE_PATCH', object)"
        ]
    ],
    denormalizationContext: [ 'groups' => ['message:write'] ],
    normalizationContext: [ 'groups' => ['message:read'] ],

)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['message:read'])]
    private $id;

    #[Groups(['message:read', 'message:write'])]
    #[ORM\Column(type: 'text')]
    private $content;

    #[Groups(['message:read', "ticket:read"])]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private $owner;

    #[Groups(['message:read', 'message:write'])]
    #[ORM\ManyToOne(targetEntity: Ticket::class, inversedBy: 'messages')]
    #[ORM\JoinColumn(nullable: false)]
    private $ticket;


    #[Groups(['message:item:patch', 'message:read', 'ticket:read'])]
    #[ORM\Column(type: 'boolean')]
    private $isRead;

    #[Groups(['message:read'])]
    #[ORM\Column(type: 'datetime')]
    private $dateSend;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getTicket(): ?Ticket
    {
        return $this->ticket;
    }

    public function setTicket(?Ticket $ticket): self
    {
        $this->ticket = $ticket;

        return $this;
    }

    public function isIsRead(): ?bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): self
    {
        $this->isRead = $isRead;

        return $this;
    }

    public function getDateSend(): ?\DateTimeInterface
    {
        return $this->dateSend;
    }

    public function setDateSend(\DateTimeInterface $dateSend): self
    {
        $this->dateSend = $dateSend;

        return $this;
    }
}
