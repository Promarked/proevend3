<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use AppBundle\Entity\Ticket;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("event/{eventId}/ticket")
 */
class TicketController extends RestController
{


    /**
     * @Route(".json")
     * @Method({"GET"})
     */
    public function listAction($eventId)
    {
        $event = $this->getDoctrine()->getRepository("AppBundle:Event")->find($eventId);
        $json = $this->serializer($event->getTickets()->toArray());
        if (sizeof($event->getTickets()->toArray()))
            return new JsonResponse(["objects" => $json]);
        else
            return new JsonResponse();
    }

    /**
     * @param Request $request
     * @return mixed
     */
    protected function restAction(Request $request)
    {
        // TODO: Implement restAction() method.
    }

    /**
     * @param Request $request
     * @return mixed
     */
    protected function renderAction(Request $request)
    {
        // TODO: Implement renderAction() method.
    }

    /**
     * @param Request $request
     * @return mixed
     */
    protected function callAction(Request $request)
    {
        // TODO: Implement callAction() method.
    }


}
