<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Register
 *
 * @ORM\Table(name="register", indexes={@ORM\Index(name="fk_register_user1_idx", columns={"user_id"}), @ORM\Index(name="fk_register_tikect_type1_idx", columns={"tikect_type_id"}), @ORM\Index(name="fk_register_user2_idx", columns={"registrator_id"}), @ORM\Index(name="fk_register_sponsor1_idx", columns={"sponsor_id"})})
 * @ORM\Entity
 */
class Register
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
     * @ORM\Column(name="number_ident", type="string", length=45, nullable=false)
     */
    private $numberIdent;

    /**
     * @var string
     *
     * @ORM\Column(name="type_ident", type="string", length=20, nullable=false)
     */
    private $typeIdent;

    /**
     * @var string
     *
     * @ORM\Column(name="nac", type="string", length=45, nullable=false)
     */
    private $nac;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=45, nullable=true)
     */
    private $type;

    /**
     * @var boolean
     *
     * @ORM\Column(name="trash", type="boolean", nullable=true)
     */
    private $trash = '0';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="create", type="datetime", nullable=true)
     */
    private $create;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="joined", type="datetime", nullable=true)
     */
    private $joined;

    /**
     * @var boolean
     *
     * @ORM\Column(name="reuse", type="boolean", nullable=true)
     */
    private $reuse = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="key", type="string", length=200, nullable=true)
     */
    private $key;

    /**
     * @var string
     *
     * @ORM\Column(name="story", type="string", length=400, nullable=true)
     */
    private $story;

    /**
     * @var \Sponsor
     *
     * @ORM\ManyToOne(targetEntity="Sponsor")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="sponsor_id", referencedColumnName="id")
     * })
     */
    private $sponsor;

    /**
     * @var \Ticket
     *
     * @ORM\ManyToOne(targetEntity="Ticket")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="tikect_type_id", referencedColumnName="id")
     * })
     */
    private $tikectType;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="registrator_id", referencedColumnName="id")
     * })
     */
    private $registrator;


    public function __construct()
    {
        $this->created= new \DateTime();
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
     * Set numberIdent
     *
     * @param string $numberIdent
     *
     * @return Register
     */
    public function setNumberIdent($numberIdent)
    {
        $this->numberIdent = $numberIdent;

        return $this;
    }

    /**
     * Get numberIdent
     *
     * @return string
     */
    public function getNumberIdent()
    {
        return $this->numberIdent;
    }

    /**
     * Set typeIdent
     *
     * @param string $typeIdent
     *
     * @return Register
     */
    public function setTypeIdent($typeIdent)
    {
        $this->typeIdent = $typeIdent;

        return $this;
    }

    /**
     * Get typeIdent
     *
     * @return string
     */
    public function getTypeIdent()
    {
        return $this->typeIdent;
    }

    /**
     * Set nac
     *
     * @param string $nac
     *
     * @return Register
     */
    public function setNac($nac)
    {
        $this->nac = $nac;

        return $this;
    }

    /**
     * Get nac
     *
     * @return string
     */
    public function getNac()
    {
        return $this->nac;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Register
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set trash
     *
     * @param boolean $trash
     *
     * @return Register
     */
    public function setTrash($trash)
    {
        $this->trash = $trash;

        return $this;
    }

    /**
     * Get trash
     *
     * @return boolean
     */
    public function getTrash()
    {
        return $this->trash;
    }

    /**
     * Set create
     *
     * @param \DateTime $create
     *
     * @return Register
     */
    public function setCreate($create)
    {
        $this->create = $create;

        return $this;
    }

    /**
     * Get create
     *
     * @return \DateTime
     */
    public function getCreate()
    {
        return $this->create;
    }

    /**
     * Set joined
     *
     * @param \DateTime $joined
     *
     * @return Register
     */
    public function setJoined($joined)
    {
        $this->joined = $joined;

        return $this;
    }

    /**
     * Get joined
     *
     * @return \DateTime
     */
    public function getJoined()
    {
        return $this->joined;
    }

    /**
     * Set reuse
     *
     * @param boolean $reuse
     *
     * @return Register
     */
    public function setReuse($reuse)
    {
        $this->reuse = $reuse;

        return $this;
    }

    /**
     * Get reuse
     *
     * @return boolean
     */
    public function getReuse()
    {
        return $this->reuse;
    }

    /**
     * Set key
     *
     * @param string $key
     *
     * @return Register
     */
    public function setKey($key)
    {
        $this->key = $key;

        return $this;
    }

    /**
     * Get key
     *
     * @return string
     */
    public function getKey()
    {
        return $this->key;
    }

    /**
     * Set sponsor
     *
     * @param \AppBundle\Entity\Sponsor $sponsor
     *
     * @return Register
     */
    public function setSponsor(\AppBundle\Entity\Sponsor $sponsor = null)
    {
        $this->sponsor = $sponsor;

        return $this;
    }

    /**
     * Get sponsor
     *
     * @return \AppBundle\Entity\Sponsor
     */
    public function getSponsor()
    {
        return $this->sponsor;
    }

    /**
     * Set tikectType
     *
     * @param \AppBundle\Entity\Ticket $tikectType
     *
     * @return Register
     */
    public function setTikectType(\AppBundle\Entity\Ticket $tikectType = null)
    {
        $this->tikectType = $tikectType;

        return $this;
    }

    /**
     * Get tikectType
     *
     * @return \AppBundle\Entity\Ticket
     */
    public function getTikectType()
    {
        return $this->tikectType;
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return Register
     */
    public function setUser(\AppBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \AppBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set registrator
     *
     * @param \AppBundle\Entity\User $registrator
     *
     * @return Register
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
     * Set story
     *
     * @param string $story
     *
     * @return Register
     */
    public function setStory($story)
    {
        if(is_array($story))
            $story = json_encode($story);
        $this->story = $story;

        return $this;
    }

    /**
     * Get story
     *
     * @return json
     */
    public function getStory()
    {
        return json_decode($this->story, true);
    }
}
