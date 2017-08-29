<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Session
 *
 * @ORM\Table(name="session", uniqueConstraints={@ORM\UniqueConstraint(name="token_auth_UNIQUE", columns={"token_auth"}), @ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_session_user1_idx", columns={"user_id"})})
 * @ORM\Entity
 */
class Session
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
     * @ORM\Column(name="token_auth", type="string", length=250, nullable=false)
     */
    private $tokenAuth;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="time_start", type="datetime", nullable=false)
     */
    private $timeStart;

    /**
     * @var string
     *
     * @ORM\Column(name="code_session", type="string", length=250, nullable=true)
     */
    private $codeSession;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="time_last_entry", type="datetime", nullable=false)
     */
    private $timeLastEntry;

    /**
     * @var string
     *
     * @ORM\Column(name="cookie_client", type="string", length=250, nullable=false)
     */
    private $cookieClient;

    /**
     * @var boolean
     *
     * @ORM\Column(name="always_open", type="boolean", nullable=true)
     */
    private $alwaysOpen = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=40, nullable=false)
     */
    private $salt;

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
        $this->timeStart= new \DateTime();
        $this->timeLastEntry= new \DateTime();
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
     * Set tokenAuth
     *
     * @param string $tokenAuth
     *
     * @return Session
     */
    public function setTokenAuth($tokenAuth)
    {
        $this->tokenAuth = $tokenAuth;

        return $this;
    }

    /**
     * Get tokenAuth
     *
     * @return string
     */
    public function getTokenAuth()
    {
        return $this->tokenAuth;
    }

    /**
     * Set timeStart
     *
     * @param \DateTime $timeStart
     *
     * @return Session
     */
    public function setTimeStart($timeStart)
    {
        $this->timeStart = $timeStart;

        return $this;
    }

    /**
     * Get timeStart
     *
     * @return \DateTime
     */
    public function getTimeStart()
    {
        return $this->timeStart;
    }

    /**
     * Set codeSession
     *
     * @param string $codeSession
     *
     * @return Session
     */
    public function setCodeSession($codeSession)
    {
        $this->codeSession = $codeSession;

        return $this;
    }

    /**
     * Get codeSession
     *
     * @return string
     */
    public function getCodeSession()
    {
        return $this->codeSession;
    }

    /**
     * Set timeLastEntry
     *
     * @param \DateTime $timeLastEntry
     *
     * @return Session
     */
    public function setTimeLastEntry($timeLastEntry)
    {
        $this->timeLastEntry = $timeLastEntry;

        return $this;
    }

    /**
     * Get timeLastEntry
     *
     * @return \DateTime
     */
    public function getTimeLastEntry()
    {
        return $this->timeLastEntry;
    }

    /**
     * Set cookieClient
     *
     * @param string $cookieClient
     *
     * @return Session
     */
    public function setCookieClient($cookieClient)
    {
        $this->cookieClient = $cookieClient;

        return $this;
    }

    /**
     * Get cookieClient
     *
     * @return string
     */
    public function getCookieClient()
    {
        return $this->cookieClient;
    }

    /**
     * Set alwaysOpen
     *
     * @param boolean $alwaysOpen
     *
     * @return Session
     */
    public function setAlwaysOpen($alwaysOpen)
    {
        $this->alwaysOpen = $alwaysOpen;

        return $this;
    }

    /**
     * Get alwaysOpen
     *
     * @return boolean
     */
    public function getAlwaysOpen()
    {
        return $this->alwaysOpen;
    }

    /**
     * Set salt
     *
     * @param string $salt
     *
     * @return Session
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
     * Set user
     *
     * @param \AppBundle\Entity\User $user
     *
     * @return Session
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
