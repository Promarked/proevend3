<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Account
 *
 * @ORM\Table(name="account", indexes={@ORM\Index(name="fk_account_user1_idx", columns={"user_id"})})
 * @ORM\Entity
 */
class Account
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
     * @ORM\Column(name="system", type="string", length=45, nullable=false)
     */
    private $system;

    /**
     * @var string
     *
     * @ORM\Column(name="token_access", type="string", length=200, nullable=false)
     */
    private $tokenAccess;

    /**
     * @var boolean
     *
     * @ORM\Column(name="enable", type="boolean", nullable=true)
     */
    private $enable = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="secrect_password", type="string", length=45, nullable=true)
     */
    private $secrectPassword;

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=40, nullable=true)
     */
    private $salt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=true)
     */
    private $created = 'CURRENT_TIMESTAMP';

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;


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
     * Set system
     *
     * @param string $system
     *
     * @return Account
     */
    public function setSystem($system)
    {
        $this->system = $system;

        return $this;
    }

    /**
     * Get system
     *
     * @return string
     */
    public function getSystem()
    {
        return $this->system;
    }

    /**
     * Set tokenAccess
     *
     * @param string $tokenAccess
     *
     * @return Account
     */
    public function setTokenAccess($tokenAccess)
    {
        $this->tokenAccess = $tokenAccess;

        return $this;
    }

    /**
     * Get tokenAccess
     *
     * @return string
     */
    public function getTokenAccess()
    {
        return $this->tokenAccess;
    }

    /**
     * Set enable
     *
     * @param boolean $enable
     *
     * @return Account
     */
    public function setEnable($enable)
    {
        $this->enable = $enable;

        return $this;
    }

    /**
     * Get enable
     *
     * @return boolean
     */
    public function getEnable()
    {
        return $this->enable;
    }

    /**
     * Set secrectPassword
     *
     * @param string $secrectPassword
     *
     * @return Account
     */
    public function setSecrectPassword($secrectPassword)
    {
        $this->secrectPassword = $secrectPassword;

        return $this;
    }

    /**
     * Get secrectPassword
     *
     * @return string
     */
    public function getSecrectPassword()
    {
        return $this->secrectPassword;
    }

    /**
     * Set salt
     *
     * @param string $salt
     *
     * @return Account
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Get salt
     *
     * @return string
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Account
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return Account
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
}
