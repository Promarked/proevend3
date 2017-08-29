<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id',HiddenType::class, array())
            ->add('company',HiddenType::class, array("mapped"=>false))
            ->add('name',TextType::class,array("attr"=>["placeholder"=>"Nombre","class"=>"input-border-btm"]))
            ->add('commnet',TextareaType::class, array("attr"=>["placeholder"=>"Descripcion","class"=>"input-border-btm"]))
            ->add('quota',null, array("attr"=>["placeholder"=>"Capacidad","class"=>"input-border-btm"]))
            ->add('start',DateType::class, array(
                "html5"=>false,
                "widget"=>"single_text",
                "attr"=>["placeholder"=>"Fecha inicial","class"=>"input-border-btm input-6"]
            ))
            ->add('end',DateType::class, array(
                "html5"=>false,
                "widget"=>"single_text",
                "attr"=>["placeholder"=>"Fecha final","class"=>"input-border-btm input-6"]
            ))
            //->add('country', CountryType::class, array("attr"=>["placeholder"=>"Pais","class"=>"input-border-btm"]))
            ->add('cover',HiddenType::class, array("attr"=>["class"=>"input-border-btm ", "data-import"=>"cover",]))
            ->add('company',HiddenType::class, array("mapped"=>false,"attr"=>["class"=>"input-border-btm ", "data-import"=>"company",]))
            ->add('location',TextType::class, array("mapped"=>false,"attr"=>["placeholder"=>"Ciudad","class"=>"input-border-btm "]))
            //->add('city',TextType::class, array("attr"=>["placeholder"=>"Ciudad","class"=>"input-border-btm"]))
            ->add('webSite',UrlType::class, array("attr"=>["placeholder"=>"Sitio web","class"=>"input-border-btm"]))
                    ;
    }
    
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'AppBundle\Entity\Event'
        ));

    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'appbundle_event';
    }




}
