<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Cache\Tests\Adapter\DoctrineAdapterTest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/logout")
 */
class LogoutController extends RestController
{

    /**
     * @Route("/")
     * @Method({"GET"})
     */
    public function renderAction(Request $request)
    {
        $tokenClient = $request->cookies->get('_promarked_event_token_client');
        $sessionObj = $this->getDoctrine()->getRepository("AppBundle:Session")->findOneBy(["cookieClient" => $tokenClient]);
        $em = $this->getDoctrine()->getEntityManager();
        $em->remove($sessionObj);
        $em->flush();
        $this->clearCookie($request,'_promarked_event_token_Ao');
        $this->clearCookie($request,'_promarked_event_trs');
        return $this->redirect($this->generateUrl("app_home_render"));
    }

    protected function restAction(Request $request)
    {
        // TODO: Implement restAction() method.
    }

    protected function callAction(Request $request)
    {
        // TODO: Implement callAction() method.
    }


}
