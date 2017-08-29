<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * License
 *
 * @ORM\Table(name="license")
 * @ORM\Entity
 */
class License
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
     * @var float
     *
     * @ORM\Column(name="prace", type="float", precision=10, scale=0, nullable=false)
     */
    private $prace;

    /**
     * @var string
     *
     * @ORM\Column(name="comment", type="string", length=300, nullable=true)
     */
    private $comment;

    /**
     * @var string
     *
     * @ORM\Column(name="descriptions", type="string", length=500, nullable=true)
     */
    private $descriptions;

    /**
     * @var boolean
     *
     * @ORM\Column(name="enable", type="boolean", nullable=true)
     */
    private $enable = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=250, nullable=true)
     */
    private $image;

    /**
     * @var integer
     *
     * @ORM\Column(name="time", type="integer", nullable=true)
     */
    private $time = '30';

    /**
     * @var integer
     *
     * @ORM\Column(name="free_time", type="integer", nullable=true)
     */
    private $freeTime = '15';

    /**
     * @var string
     *
     * @ORM\Column(name="fuctions", type="text", length=65535, nullable=true)
     */
    private $fuctions;



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
     * @return License
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
     * Set prace
     *
     * @param float $prace
     *
     * @return License
     */
    public function setPrace($prace)
    {
        $this->prace = $prace;

        return $this;
    }

    /**
     * Get prace
     *
     * @return float
     */
    public function getPrace()
    {
        return $this->prace;
    }

    /**
     * Set comment
     *
     * @param string $comment
     *
     * @return License
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
     * Set descriptions
     *
     * @param string $descriptions
     *
     * @return License
     */
    public function setDescriptions($descriptions)
    {
        $this->descriptions = $descriptions;

        return $this;
    }

    /**
     * Get descriptions
     *
     * @return string
     */
    public function getDescriptions()
    {
        return $this->descriptions;
    }

    /**
     * Set enable
     *
     * @param boolean $enable
     *
     * @return License
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
     * Set image
     *
     * @param string $image
     *
     * @return License
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set time
     *
     * @param integer $time
     *
     * @return License
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get time
     *
     * @return integer
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set freeTime
     *
     * @param integer $freeTime
     *
     * @return License
     */
    public function setFreeTime($freeTime)
    {
        $this->freeTime = $freeTime;

        return $this;
    }

    /**
     * Get freeTime
     *
     * @return integer
     */
    public function getFreeTime()
    {
        return $this->freeTime;
    }

    /**
     * Set fuctions
     *
     * @param string $fuctions
     *
     * @return License
     */
    public function setFuctions($fuctions)
    {
        $this->fuctions = $fuctions;

        return $this;
    }

    /**
     * Get fuctions
     *
     * @return string
     */
    public function getFuctions()
    {
        return $this->fuctions;
    }
}
