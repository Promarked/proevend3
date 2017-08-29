<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use AppBundle\Entity\Account;
use AppBundle\Entity\Contract;
use AppBundle\Entity\Event;
use AppBundle\Entity\SectionEvent;
use AppBundle\Entity\Ticket;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;


/**
 * @Route("/event")
 */
class EventController extends RestController
{
    /**
     * @Route(".json")
     * @Method({"GET"})
     */
    public function listAction()
    {
        $events = $this->getEventsByAccount();
        $json = $this->serializer($events);
        if (sizeof($events))
            return new JsonResponse(["objects" =>["name"=>"event","value"=> $json]]);
        else
            return new JsonResponse(["objects" =>["name"=>"event","value"=> []]]);
    }

    /**
     * @Route("/{id}.json")
     * @Method({"GET"})
     */
    public function getAction($id)
    {
        $event = $this->getDoctrine()->getRepository("AppBundle:Event")->find($id);
        $json = $this->serializer($event);
        if ($event)
            return new JsonResponse(["objects" => ["name" => "event", "value" => $json]]);
        else
            return new JsonResponse(["objects" =>["name"=>"event","value"=> []]]);
    }

    /**
     * @Route("/{id}.edit")
     * @Method({"POST"})
     */
    public function editAction(Request $request, $id)
    {
        $event = $this->getDoctrine()->getRepository("AppBundle:Event")->find($id);
        $this->handleRequest($event, $request);

        $em = $this->getDoctrine()->getEntityManager();
        $em->persist($event);
        $em->flush();

        $events = $this->getEventsByAccount();
        $json = $this->serializer($events);
        if ($event)
            return new JsonResponse(["objects" => ["name" => "event", "value" => $json]]);
        else
            return new JsonResponse(["objects" =>["name"=>"event","value"=> []]]);
    }

    /**
     * @Route(".create")
     * @Method({"POST"})
     */
    public function createAction(Request $request)
    {
        $event = new Event();

        $account = $this->getAccount();
        $this->handleRequest($event, $request);
        $event->setXfields('[
    {"name": "type_ident", "type": "text", "label": "Tipo de identificacion"},
    {"name": "number_ident", "type": "text", "label": "Identificacion"},
    {"name": "firstName", "type": "text", "label": "Nombres"},
    {"name": "lastName", "type": "text", "label": "Apellidos"},
    {
        "name": "sex",
        "type": "radio",
        "label": "Sexo",
        "options": [{"label": "Masculino", "value": "Masculino"}, {"label": "Femenino", "value": "Femenino"}]
    },
    {"name": "country", "type": "text", "label": "Pais"},
    {"name": "province", "type": "text", "label": "Departamento"},
    {"name": "city", "type": "text", "label": "Ciudad"},
    {"name": "email", "type": "email", "label": "Correo electronico"},
    {"name": "phone", "type": "email", "label": "Telefono", "deleteable": true},
    {
        "name": "ocupation",
        "type": "select",
        "label": "Ocupacion",
        "options": ["Ingeniero civil", "Ingeniero de Sistemas", "Medico", "Pediatra", "Doctor"],
        "other": true,
        "deleteable": true
    },
    {
        "name": "pay",
        "type": "select",
        "label": "Forma de pago",
        "options": [{"label": "Invitado", "value": "Invitado"}, {"label": "Efectivo", "value": "Evectivo"}]
    }
]');

        $event->setUrl(urlencode($event->getName()));

        $contract = new Contract();

        $contract->setAccepted(true);
        $contract->setAdmin(true);
        $contract->setAccount($account);
        $contract->setEvent($event);
        $contract->setJob("Administrador");
        $contract->setCreated(new \DateTime("now"));

        $section = new SectionEvent();
        $section->setStart($event->getStart());
        $endSection = $event->getEnd();
        $endSection->modify("+23 hour");
        $endSection->modify("+59 minutes");
        $event->setEnd($endSection);
        $section->setEnd($endSection);
        $section->setName("Todo el evento");
        $section->setEvent($event);

        $ticket = new Ticket();
        $ticket->setName("Ticket General");
        $ticket->setEvent($event);
        $ticket->setPrice(0.0);
        $ticket->addSectionEvent($section);

        $em = $this->getDoctrine()->getEntityManager();
        $em->persist($contract);
        $em->persist($event);
        $em->persist($section);
        $em->persist($ticket);
        $em->flush();

        $events = $this->getEventsByAccount();
        $json = $this->serializer($events);
        if (sizeof($events))
            return new JsonResponse(["objects" =>["name"=>"event","value"=> $json], "notification" => ["type" => "success", "title" => "Evento Creado exitozamente"]]);
        else
            return new JsonResponse(["objects" =>["name"=>"event","value"=> []]]);

    }

    /**
     * @Route(".delete")
     * @Method({"POST"})
     */
    public function deleteAction(Request $request)
    {
        $eventsId = split(',',$request->getContent());
        $em = $this->getDoctrine()->getEntityManager();
        $story=[];


        if(is_array($eventsId)){
            foreach ($eventsId as $id){
                $event = $this->getDoctrine()->getRepository("AppBundle:Event")->find($id);
                if($event){

                    $em->remove($event);
                    $story[]=["id"=>$id, "status"=>"success"];
                }else{
                    $story[]=["id"=>$id, "status"=>"error"];
                }
            }
        }

        $em->flush();

        $events = $this->getEventsByAccount();
        $json = $this->serializer($events);
        if (sizeof($events))
            return new JsonResponse(["objects" =>["name"=>"event","value"=> $json],"story"=>$story, "notification" => ["type" => "success", "title" => "Eliminacion terminada"]]);
        else
            return new JsonResponse(["objects" =>["name"=>"event","value"=> []], "title" => "Tuvimos un problema", "comment"=>"�Los eventos no fueron encontrados o no tiene permisos para realizar esta operacon!"]);

    }

    /**
     * @Route("/prueba")
     * @Method({"GET"})
     */
    public function restAction(Request $request)
    {
        $string = '[
    {"name": "type_ident", "type": "text", "label": "Tipo de identificacion"},
    {"name": "number_ident", "type": "text", "label": "Identificacion"},
    {"name": "firstName", "type": "text", "label": "Nombres"},
    {"name": "lastName", "type": "text", "label": "Apellidos"},
    {
        "name": "sex",
        "type": "radio",
        "label": "Sexo",
        "opctions": [{"label": "Masculino", "value": "Masculino"}, {"label": "Femenino", "value": "Femenino"}]
    },
    {"name": "country", "type": "text", "label": "Pais"},
    {"name": "province", "type": "text", "label": "Departamento"},
    {"name": "city", "type": "text", "label": "Ciudad"},
    {"name": "email", "type": "email", "label": "Correo electronico"},
    {"name": "repeat-email", "type": "email", "label": "Repetir correo electronico"},
    {"name": "phone", "type": "email", "label": "Telefono", "deleteable": true},
    {
        "name": "ocupation",
        "type": "select",
        "label": "Ocupacion",
        "opctions": [{"label": "Seleccione una ocupacion", "value": ""}, {"label": "Doctor", "value": "Doctor"}],
        "other": true,
        "deleteable": true
    },
    {
        "name": "pay",
        "type": "select",
        "label": "Forma de pago",
        "opctions": [{"label": "Invitado", "value": "Invitado"}, {"label": "Efectivo", "value": "Evectivo"}],
        "other": true
    }
]';

        return new JsonResponse(["request" => json_decode($string, true)]);
    }

    protected function renderAction(Request $request)
    {
        // TODO: Implement renderAction() method.
    }

    protected function callAction(Request $request)
    {
        // TODO: Implement callAction() method.
    }

    public function isAuthenticable()
    {
        return true; // TODO: Change the autogenerated stub
    }

    private function getEventsByAccount()
    {
        return $this->getDoctrine()->getEntityManager()
            ->createQueryBuilder()
            ->select('e')
            ->from('AppBundle:Event', 'e')
            ->join('e.contracts', 'c')
            ->join('c.account', 'a')
            ->where('a.id = :account_id and e.trash=0')
            ->setParameter('account_id', $this->getAccount()->getId())
            ->getQuery()
            ->getResult();
    }


}
