<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/app")
 */
class DashboardController extends RestController
{
    /**
     * @Route("/")
     * @Method({"GET"})
     */
    public function renderAction(Request $request)
    {
        //$user=$this->getUserCurrent();
        return $this->render('AppBundle:Admin:dashboard.html.twig');
    }

    public function callAction(Request $request)
    {
        // TODO: Implement callAction() method.
    }


    public function isAuthenticable()
    {
        return true;
    }

    /**
     * @Route("/REST")
     * @Method({"GET"})
     */
    public function restAction(Request $request)
    {
        return new JsonResponse(["menssage"=>"Hola Este s una prueba"]);
    }


}
