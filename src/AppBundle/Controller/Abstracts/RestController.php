<?php

namespace AppBundle\Controller\Abstracts;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

abstract class RestController extends Controller implements RestListenerController
{
    private $restResult = [];

    private $user;

    private $authenticable;

    public function getRestResult()
    {
        return $this->restResult;
    }

    public function setValue($name, $value)
    {
        $this->restResult[$name] = $value;
        return $this->restResult;
    }

    public function getValue($name)
    {
        return $this->restResult[$name];
    }

    public function getUserCurrent()
    {
        return $this->user;
    }

    public function setUserCurrent($user)
    {
        $this->user = $user;
    }

    /*
     * @return Account
     */
    public function getAccount()
    {
        return $this->getDoctrine()->getRepository("AppBundle:Account")->findOneByUser($this->user);
    }

    protected function equalsHash($string, $hash, $salt)
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

    protected function generateToken()
    {
        $date = new \DateTime();
        $dateString = $date->format('Y-m-d-H-i-s');
        return hash('sha512', $dateString);
    }


    public function isAuthenticable()
    {
        return $this->authenticable;
    }


    public function setAuthenticable($authenticable)
    {
        $this->authenticable = $authenticable;
    }

    protected function sendCookie(Request $request, $name, $value)
    {
        $response = new Response();
        $response->prepare($request);
        $expire  =  2147483647 ;
        $cookie = new Cookie($name, $value, $expire);
        $response->headers->setCookie($cookie);
        $response->send();
    }

    protected function clearCookie(Request $request, $name)
    {
        $response = new Response();
        $response->prepare($request);
        $response->headers->clearCookie($name);
        $response->send();
    }

    protected function nativeQueryArray($query)
    {
        $connection =$this->getDoctrine()
            ->getEntityManager()
            ->getConnection();
        $connection->prepare("SET lc_time_names = 'es_CO'")->execute();
        $staitment = $connection
            ->prepare($query);
        $staitment->execute();
        return $staitment->fetchAll();
        //SET lc_time_names = 'es_VE';
    }

    protected function serializer($obj){
        if(is_object($obj)){
            $json=[];
            foreach ($this->getMethodsClass($obj) as $method){
                if(substr( $method, 0, 3 )=="get"){
                    //strtolower
                    $name = strtolower(substr( $method,3 ));
                    $value = $obj->$method();
                    if(!is_object($value))
                        $json[$name] = $value;
                    else if($value instanceof \DateTime){
                        $json[$name]= $value->format('Y-m-d H:i:s');
                    }
                }else if (substr( $method, 0, 2)=="is"){
                    $name = strtolower(substr( $method,2));
                    $value = $obj->$method();
                    if(!is_object($value) || is_array($value) )
                        $json[$name] = $value;
                }
            }
            return $json;
        }
        if(is_array($obj)){
            $array = [];
            foreach ($obj as $object){
                $array[]=$this->serializer($object);
            }
            return $array;
        }
        return [];
    }

    protected function handleRequest($obj, Request $request){
        $obj = $this->deserialize($obj, $request->request->all());
        return $obj;
    }

    protected function deserialize($obj, $array){
        if(is_array($array) ){
            if(!$this->isArrayNumeric($array) && is_object($obj)){
                foreach (array_keys($array) as $key){
                    $method = "set".ucfirst(strtolower($key));
                    if(method_exists($obj,$method)){
                        $comment_string= (new \ReflectionClass($obj))->getMethod($method)->getdoccomment();

                        //define the regular expression pattern to use for string matching
                        $pattern = "#(@[a-zA-Z]+\s*[a-zA-Z0-9, ()_].*)#";

                        //perform the regular expression on the string provided
                        preg_match_all($pattern, $comment_string, $matches, PREG_PATTERN_ORDER);

                        $matches = $matches[0];
                        $obj->$method($array[$key]);
                        foreach ( $matches as $comment){
                            if(strpos($comment, '@param')!== false){
                                $type = explode(" ", $comment)[1];
                                if($type!=="string"){
                                    switch ($type) {
                                        case "\\DateTime":
                                            if(!$array[$key] instanceof \DateTime)
                                                $obj->$method(new \DateTime($array[$key]));
                                            break;
                                        case "integer":
                                            $obj->$method(intval($array[$key]));
                                            break;
                                        case "boolean":
                                            $obj->$method(boolval($array[$key]));
                                            break;
                                    }
                                }

                                break;
                            }
                        }


                    }

                }
                return $obj;
            }else if(is_array($obj)){
                //
            }
        }
        return null;
    }

    protected function isArrayNumeric($array){
        foreach (array_keys($array) as $key){
            if(!is_numeric($key))
                return false;
        }
        return true;
    }

    protected function getMethodsClass($obj){
        if(is_object($obj))
            return get_class_methods($obj);
        return array();

    }


    abstract protected function restAction(Request $request);

    abstract protected function renderAction(Request $request);

    abstract protected function callAction(Request $request);

}
