<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ticket
 *
 * @ORM\Table(name="ticket", indexes={@ORM\Index(name="fk_ticket_event1_idx", columns={"event_id"})})
 * @ORM\Entity
 */
class Ticket
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="bigint", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=45, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="comment", type="string", length=400, nullable=true)
     */
    private $comment;

    /**
     * @var string
     *
     * @ORM\Column(name="icon", type="text", length=65535, nullable=true)
     */
    private $icon;

    /**
     * @var integer
     *
     * @ORM\Column(name="price", type="bigint", nullable=false)
     */
    private $price = '0';

    /**
     * @var \Event
     *
     * @ORM\ManyToOne(targetEntity="Event")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="event_id", referencedColumnName="id")
     * })
     */
    private $event;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="SectionEvent", inversedBy="tikectType")
     * @ORM\JoinTable(name="tikect_type_has_section_event",
     *   joinColumns={
     *     @ORM\JoinColumn(name="tikect_type_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="section_event_id", referencedColumnName="id")
     *   }
     * )
     */
    private $sectionEvent;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->sectionEvent = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Ticket
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set comment
     *
     * @param string $comment
     *
     * @return Ticket
     */
    public function setComment($comment)
    {
        $this->comment = $comment;

        return $this;
    }

    /**
     * Get comment
     *
     * @return string
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * Set icon
     *
     * @param string $icon
     *
     * @return Ticket
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * Get icon
     *
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set price
     *
     * @param integer $price
     *
     * @return Ticket
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return integer
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set event
     *
     * @param \AppBundle\Entity\Event $event
     *
     * @return Ticket
     */
    public function setEvent(\AppBundle\Entity\Event $event = null)
    {
        $this->event = $event;

        return $this;
    }

    /**
     * Get event
     *
     * @return \AppBundle\Entity\Event
     */
    public function getEvent()
    {
        return $this->event;
    }

    /**
     * Add sectionEvent
     *
     * @param \AppBundle\Entity\SectionEvent $sectionEvent
     *
     * @return Ticket
     */
    public function addSectionEvent(\AppBundle\Entity\SectionEvent $sectionEvent)
    {
        $this->sectionEvent[] = $sectionEvent;

        return $this;
    }

    /**
     * Remove sectionEvent
     *
     * @param \AppBundle\Entity\SectionEvent $sectionEvent
     */
    public function removeSectionEvent(\AppBundle\Entity\SectionEvent $sectionEvent)
    {
        $this->sectionEvent->removeElement($sectionEvent);
    }

    /**
     * Get sectionEvent
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSectionEvent()
    {
        return $this->sectionEvent;
    }
}
