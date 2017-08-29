<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Presence
 *
 * @ORM\Table(name="presence", indexes={@ORM\Index(name="fk_section_event_has_tikect_type_section_event1_idx", columns={"section_event_id"}), @ORM\Index(name="fk_presence_user1_idx", columns={"registrator_id"}), @ORM\Index(name="fk_presence_register1_idx", columns={"register_id"})})
 * @ORM\Entity
 */
class Presence
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
     * @var \DateTime
     *
     * @ORM\Column(name="arrival", type="datetime", nullable=true)
     */
    private $arrival = 'CURRENT_TIMESTAMP';

    /**
     * @var boolean
     *
     * @ORM\Column(name="welcome", type="boolean", nullable=true)
     */
    private $welcome = '1';

    /**
     * @var \Register
     *
     * @ORM\ManyToOne(targetEntity="Register")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="register_id", referencedColumnName="id")
     * })
     */
    private $register;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="registrator_id", referencedColumnName="id")
     * })
     */
    private $registrator;

    /**
     * @var \SectionEvent
     *
     * @ORM\ManyToOne(targetEntity="SectionEvent")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="section_event_id", referencedColumnName="id")
     * })
     */
    private $sectionEvent;


    public function __construct()
    {
        $this->arrival= new \DateTime();
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
     * Set arrival
     *
     * @param \DateTime $arrival
     *
     * @return Presence
     */
    public function setArrival($arrival)
    {
        $this->arrival = $arrival;

        return $this;
    }

    /**
     * Get arrival
     *
     * @return \DateTime
     */
    public function getArrival()
    {
        return $this->arrival;
    }

    /**
     * Set welcome
     *
     * @param boolean $welcome
     *
     * @return Presence
     */
    public function setWelcome($welcome)
    {
        $this->welcome = $welcome;

        return $this;
    }

    /**
     * Get welcome
     *
     * @return boolean
     */
    public function getWelcome()
    {
        return $this->welcome;
    }

    /**
     * Set register
     *
     * @param \AppBundle\Entity\Register $register
     *
     * @return Presence
     */
    public function setRegister(\AppBundle\Entity\Register $register = null)
    {
        $this->register = $register;

        return $this;
    }

    /**
     * Get register
     *
     * @return \AppBundle\Entity\Register
     */
    public function getRegister()
    {
        return $this->register;
    }

    /**
     * Set registrator
     *
     * @param \AppBundle\Entity\User $registrator
     *
     * @return Presence
     */
    public function setRegistrator(\AppBundle\Entity\User $registrator = null)
    {
        $this->registrator = $registrator;

        return $this;
    }

    /**
     * Get registrator
     *
     * @return \AppBundle\Entity\User
     */
    public function getRegistrator()
    {
        return $this->registrator;
    }

    /**
     * Set sectionEvent
     *
     * @param \AppBundle\Entity\SectionEvent $sectionEvent
     *
     * @return Presence
     */
    public function setSectionEvent(\AppBundle\Entity\SectionEvent $sectionEvent = null)
    {
        $this->sectionEvent = $sectionEvent;

        return $this;
    }

    /**
     * Get sectionEvent
     *
     * @return \AppBundle\Entity\SectionEvent
     */
    public function getSectionEvent()
    {
        return $this->sectionEvent;
    }
}
