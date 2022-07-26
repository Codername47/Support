<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Doctrine\TicketSetOwnerListener;
use App\Repository\TicketRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: TicketRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => ['security' => "is_granted('ROLE_ADMIN')"],
        'post' => ['security' => "!is_granted('ROLE_ADMIN') and is_granted('ROLE_USER')"]
    ],

    itemOperations: [
        'get' => ['security' => "(is_granted('TICKET_VIEW', object)) or is_granted('ROLE_ADMIN')"],
        'put' => ['security' => "is_granted('ROLE_ADMIN')"],
        'delete'=> ['security' => "is_granted('ROLE_ADMIN')"],
        'patch' => ['security' => "is_granted('ROLE_ADMIN')"]
    ],

    attributes: [
        'security' => "is_granted('ROLE_USER')",
        "pagination_items_per_page" => 10
    ],

    denormalizationContext: [ 'groups' => ['ticket:write'] ],
    normalizationContext: [ 'groups' => ['ticket:read'] ],
    order: ["status.id", "dateUpdate" => "DESC"],

)]
#[ORM\EntityListeners([TicketSetOwnerListener::class])]
class Ticket
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['ticket:read'])]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups(['ticket:read', 'ticket:write'])]
    #[Assert\Length(
        min: 2,
        max: 64,
        minMessage: 'title should be at least {{ limit }} characters',
        maxMessage: 'title should be less {{ limit }} characters',
    )]
    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[Assert\Length(
        min: 1,
        max: 88,
        minMessage: "Please, enter description",
        maxMessage: 'Your description should be less {{ limit }} characters',
    )]
    #[Groups(['ticket:read', 'ticket:write'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $description;

    #[Assert\Length(
        min: 1,
        max: 512,
        minMessage: "Please, enter details",
        maxMessage: 'Your details should be less {{ limit }} characters',
    )]
    #[Groups(['ticket:read', 'ticket:write'])]
    #[ORM\Column(type: 'text')]
    private $details;

    #[ApiSubresource]
    #[Groups(['ticket:read'])]
    #[ORM\OneToMany(mappedBy: 'ticket', targetEntity: Message::class, orphanRemoval: true)]
    private $messages;

    #[Groups(['ticket:read', 'admin:write'])]
    #[ORM\ManyToOne(targetEntity: TicketStatus::class, inversedBy: 'tickets')]
    #[ORM\JoinColumn(nullable: false)]
    private $status;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'tickets')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['ticket:read'])]
    private $owner;

    #[Groups(['ticket:read'])]
    #[ORM\Column(type: 'datetime')]
    private $dateCreation;

    #[Groups(['ticket:read'])]
    #[ORM\Column(type: 'datetime')]
    private $dateUpdate;

    public function __construct()
    {
        $this->messages = new ArrayCollection();
        $this->dateCreation = new \DateTime('now');
        $this->dateUpdate = new \DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(string $details): self
    {
        $this->details = $details;

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): self
    {
        if (!$this->messages->contains($message)) {
            $this->messages[] = $message;
            $message->setTicket($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): self
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getTicket() === $this) {
                $message->setTicket(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?TicketStatus
    {
        return $this->status;
    }

    public function setStatus(?TicketStatus $status): self
    {
        $this->status = $status;

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

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getDateUpdate(): ?\DateTimeInterface
    {
        return $this->dateUpdate;
    }

    public function setDateUpdate(\DateTimeInterface $dateUpdate): self
    {
        $this->dateUpdate = $dateUpdate;

        return $this;
    }
}
