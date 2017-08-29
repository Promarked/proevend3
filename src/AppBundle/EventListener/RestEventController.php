<?php
/**
 * Created by PhpStorm.
 * User: Acer
 * Date: 14/01/2017
 * Time: 2:04 PM
 */

namespace AppBundle\EventListener;

use AppBundle\Controller\Abstracts\RestListenerController;
use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use AppBundle\Entity\Session;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Router;
use Symfony\Component\Validator\Constraints\DateTime;
use Doctrine\ORM\EntityManager;

class RestEventController
{
    protected $em;
    protected $router;

    public function __construct(EntityManager $em, Router $router)
    {
        $this->em = $em;
        $this->router = $router;
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();
        if (!is_array($controller)) {
            return;
        }

        if ($controller[0] instanceof RestListenerController) {

            $auhO = $event->getRequest()->cookies->get('_promarked_event_token_Ao');
            $transation = $event->getRequest()->cookies->get('_promarked_event_trs');
            $tokenClient = $event->getRequest()->cookies->get('_promarked_event_token_client');
            if (!$tokenClient) {
                $response = new Response();
                $random = rand();
                $uniqid = uniqid($random, true);
                $date = new \DateTime();
                $response->prepare($event->getRequest());
                $tokenClient = $date->getTimestamp() . $uniqid;
                $cookie = new Cookie('_promarked_event_token_client', $tokenClient,2147483647);
                $response->headers->setCookie($cookie);
                $response->send();
            }



            $user = null;

            $sessionObj = $this->em->getRepository("AppBundle:Session")->findOneBy(["cookieClient" => $tokenClient]);
            if ($sessionObj) {
                $timeLast = $sessionObj->getTimeLastEntry();
                $timeNow = new \DateTime();
                $timeLastMost = new \DateTime();
                $timeLastMost->modify("+30 minutes");
                $sessionObj->setTimeLastEntry($timeNow);
                $this->saveFromDB($sessionObj);
                if ($auhO and $this->equalsHash($sessionObj->getTokenAuth(), $auhO, $sessionObj->getSalt())) {
                    if ($sessionObj->getAlwaysOpen() or $timeLast < $timeLastMost) {
                        if ($this->equalsHash($sessionObj->getCodeSession(), $transation, $sessionObj->getSalt())) {
                            $user = $sessionObj->getUser();
                            $controller[0]->setUserCurrent($user);

                        }
                    }
                }

            }


            if ($controller[0]->isAuthenticable() and !$user) {


                throw new HttpException(307, null, null, array('Location' => $this->router->generate('app_login_render')));
            }

        }
    }

    public function onKernelResponse(FilterResponseEvent $event)
    {

        $auhO = $event->getRequest()->cookies->get('_promarked_event_token_Ao');
        $transation = $event->getRequest()->cookies->get('_promarked_event_trs');
        $tokenClient = $event->getRequest()->cookies->get('_promarked_event_token_client');
        if (!$tokenClient) {
            $response = new Response();
            $random = rand();
            $uniqid = uniqid($random, true);
            $date = new \DateTime();
            $response->prepare($event->getRequest());
            $tokenClient = $date->getTimestamp() . $uniqid;
            $cookie = new Cookie('_promarked_event_token_client', $tokenClient,2147483647);
            $response->headers->setCookie($cookie);
            $response->send();
        }

        $sessionObj = $this->em->getRepository("AppBundle:Session")->findOneBy(["cookieClient" => $tokenClient]);
        if ($sessionObj) {
            $timeLast = $sessionObj->getTimeLastEntry();
            $timeNow = new \DateTime();
            $timeLastMost = new \DateTime();
            $timeLastMost->modify("+30 minutes");
            $sessionObj->setTimeLastEntry($timeNow);
            $this->saveFromDB($sessionObj);
            if ($auhO and $this->equalsHash($sessionObj->getTokenAuth(), $auhO, $sessionObj->getSalt())) {
                if ($sessionObj->getAlwaysOpen() or $timeLast < $timeLastMost) {
                    if ($this->equalsHash($sessionObj->getCodeSession(), $transation, $sessionObj->getSalt())) {
                        $response = new Response();
                        $response->prepare($event->getRequest());
                        $tokenTrans = $this->generateToken();
                        $encrypTrans = $this->encrypSalt($tokenTrans, $sessionObj->getSalt());

                        $sessionObj->setCodeSession($tokenTrans);
                        $expire  =  2147483647 ;
                        $cookie = new Cookie('_promarked_event_trs', $encrypTrans["hash"],$expire);
                        $response->headers->setCookie($cookie);
                        $response->send();

                        $this->em->persist($sessionObj);
                        $this->em->flush();

                    }
                }
            }


        }


    }

    private function deleteFromDB($entity)
    {
        $this->em->remove($entity);
        $this->em->flush();
    }

    private function saveFromDB($entity)
    {
        $this->em->persist($entity);
        $this->em->flush();
    }

    protected function generateToken()
    {
        $date = new \DateTime();
        $dateString = $date->format('Y-m-d-H-i-s');
        return hash('sha512', $dateString);
    }

    private function equalsHash($string, $hash, $salt)
    {
        $hashToken = hash('sha512', $string . $salt);
        return $hash == $hashToken;
    }

    protected function encryp($string)
    {
        $random = rand();
        $uniqid = uniqid($random, true);
        $salt = md5($uniqid);
        $hash = hash('sha512', $string . $salt);
        return ["hash" => $hash, "salt" => $salt];
    }


    protected function encrypSalt($string, $salt)
    {
        $hash = hash('sha512', $string . $salt);
        return ["hash" => $hash, "salt" => $salt];
    }

}