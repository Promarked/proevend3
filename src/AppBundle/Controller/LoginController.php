<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use AppBundle\Entity\Session;
use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Cache\Tests\Adapter\DoctrineAdapterTest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @Route("/login")
 */
class LoginController extends RestController
{


    /**
     * @Route("/")
     * @Method({"GET"})
     */
    public function renderAction(Request $request)
    {
        if (!$this->getUserCurrent())
            return $this->render('AppBundle:Home:login.html.twig', array(// ...
            ));
        else
            return $this->redirect($this->generateUrl("app_home_render"));

    }

    /**
     * @Route("/")
     * @Method({"POST"})
     */
    public function restAction(Request $request)
    {
        $user = $this->getUserCurrent();
        if ($user) {
            $profile = $this->getDoctrine()->getRepository("AppBundle:Profile")->findOneByUser($user);
            $this->setValue("firstName", $profile->getFirstName());
            $this->setValue("lastName", $profile->getLasttName());
            $this->setValue("photo", $profile->getPhoto());
        }
        return new JsonResponse($this->getRestResult());
    }

    /**
     * @Route("/")
     * @Method({"PUT"})
     */
    public function callAction(Request $request)
    {
        $method = $request->query->get("method");
        call_user_func_array(array($this, $method), $request);
    }


    /**
     * @Route("/Check/")
     * @Method({"POST"})
     */
    public function checkAction(Request $request)
    {
        $username = $request->get("_username");
        $password = $request->get("_password");

        $em = $this->getDoctrine()->getManager();
        $user = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneByUsername($username);

        if ($user and $this->equalsHash($password, $user->getPassword(), $user->getSalt())) {
            $session = new Session();
            $session->setUser($user);
            $tokenClient = $request->cookies->get('_promarked_event_token_client');
            $auhO = $this->generateToken();
            $auhOEncryp = $this->encryp($auhO);

            $salt = $auhOEncryp["salt"];

            $tokenTrans = $this->generateToken();
            $tokenTransEncryp = $this->encrypSalt($tokenTrans, $salt);

            $session->setCookieClient($tokenClient);
            $session->setCodeSession($tokenTrans);
            $session->setTokenAuth($auhO);
            $session->setSalt($salt);

            $this->sendCookie($request, "_promarked_event_trs", $tokenTransEncryp["hash"]);
            $this->sendCookie($request, "_promarked_event_token_Ao", $auhOEncryp["hash"]);

            $em->persist($session);

            /*$response = new Response();
            $response->prepare($request);
            $cookie = new Cookie("_promarked_event_trs", $tokenTransEncryp["hash"]);
            $response->headers->setCookie($cookie);
            $response->send();
            $cookie = new Cookie("_promarked_event_token_Ao", $auhOEncryp["hash"]);
            $response->headers->setCookie($cookie);
            $response->send();*/

            $em->flush();
            $profile = $this->getDoctrine()->getRepository("AppBundle:Profile")->findOneByUser($user);
            return JsonResponse::create(
                [
                    "status" => "Authorized", "code" => "307", "type" => "redirect", "message" => "Authentication accept, redirecting to dashboard.",
                    "profile" => ["firstName"=>$profile->getFirstName(),"lastName"=>$profile->getLastName(),"photo"=> $profile->getPhoto(), "sex"=>$profile->getSex()]
                ]
            );
        }

        return JsonResponse::create(["status" => "Unauthorized", "code" => "401", "type" => "error", "message" => "Authentication error, user or password is incorrect."]);
    }


    /**
     * @Route("/password/")
     * @Method({"GET"})
     */
    public function passwordAction(Request $request)
    {
        $password = "Proweb22016";
        $passwordEncryp = $this->encryp($password);

        return JsonResponse::create(["password" => $password, "encryp" => $passwordEncryp]);

    }


}
