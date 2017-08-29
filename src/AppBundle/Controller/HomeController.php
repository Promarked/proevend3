<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use AppBundle\Controller\Abstracts\RestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Cache\Tests\Adapter\DoctrineAdapterTest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class HomeController extends RestController
{


    /**
     * @Route("/")
     * @Method({"GET"})
     */
    public function renderAction(Request $request)
    {
        $user = $this->getUserCurrent();
        if ($user) {
            $profile = $this->getDoctrine()->getRepository("AppBundle:Profile")->findOneByUser($user);
            /*return $this->render('AppBundle:Dashboard:dashboard.html.twig', array("user"=>$user
            ));*/
            return $this->render('AppBundle:Home:index.html.twig', array(
                "user" => $user, "profile" => $profile, "firstName" => $profile->getFirstName()
            ));

        }
        return $this->render('AppBundle:Home:index.html.twig', array(// ...
        ));

    }

    /**
     * @Route("app/home.html")
     * @Method({"GET"})
     */
    public function pieceAction(Request $request)
    {
        return new Response();
        return $this->render('AppBundle:Home:home.htm.twig', array(// ...
        ));

    }

    /**
     * @Route("/REST")
     * @Method({"GET"})
     */
    public function restAction(Request $request)
    {
        return new JsonResponse(["menssage"=>"Hola Este s una prueba"]);
    }

    /**
     * @Route("/")
     * @Method({"PUT"})
     */
    public function callAction(Request $request)
    {
        $method = $request->query->get("method");
        call_user_func_array(array($this, $method . "Listener"), $request);
    }

}
