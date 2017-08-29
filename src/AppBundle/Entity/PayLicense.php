<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PayLicense
 *
 * @ORM\Table(name="pay_license", indexes={@ORM\Index(name="fk_pay_license_account1_idx", columns={"account_id"}), @ORM\Index(name="fk_pay_license_license1_idx", columns={"license_id"})})
 * @ORM\Entity
 */
class PayLicense
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
     * @ORM\Column(name="create", type="datetime", nullable=false)
     */
    private $create;

    /**
     * @var boolean
     *
     * @ORM\Column(name="finish", type="boolean", nullable=false)
     */
    private $finish = '0';

    /**
     * @var \Account
     *
     * @ORM\ManyToOne(targetEntity="Account")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="account_id", referencedColumnName="id")
     * })
     */
    private $account;

    /**
     * @var \License
     *
     * @ORM\ManyToOne(targetEntity="License")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="license_id", referencedColumnName="id")
     * })
     */
    private $license;


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
     * Set create
     *
     * @param \DateTime $create
     *
     * @return PayLicense
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
     * Set finish
     *
     * @param boolean $finish
     *
     * @return PayLicense
     */
    public function setFinish($finish)
    {
        $this->finish = $finish;

        return $this;
    }

    /**
     * Get finish
     *
     * @return boolean
     */
    public function getFinish()
    {
        return $this->finish;
    }

    /**
     * Set account
     *
     * @param \AppBundle\Entity\Account $account
     *
     * @return PayLicense
     */
    public function setAccount(\AppBundle\Entity\Account $account = null)
    {
        $this->account = $account;

        return $this;
    }

    /**
     * Get account
     *
     * @return \AppBundle\Entity\Account
     */
    public function getAccount()
    {
        return $this->account;
    }

    /**
     * Set license
     *
     * @param \AppBundle\Entity\License $license
     *
     * @return PayLicense
     */
    public function setLicense(\AppBundle\Entity\License $license = null)
    {
        $this->license = $license;

        return $this;
    }

    /**
     * Get license
     *
     * @return \AppBundle\Entity\License
     */
    public function getLicense()
    {
        return $this->license;
    }
}
