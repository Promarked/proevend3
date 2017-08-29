<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;


/**
 * @Route("/file")
 */
class FileController extends RestController
{

    public function indexAction($name)
    {
        return $this->render('', array('name' => $name));
    }

    /**
     * @Route("/view/image/{name}")
     * @Method({"GET"})
     */
    public function imageViewAction($name)
    {


        return new Response(
            "",
            Response::HTTP_OK,
            array('content-type' => 'image/png')
        );
    }

    /**
     * @Route("/update/image/thumbnail/")
     * @Method({"GET","POST"})
     */
    public function updateThumbnailAction(Request $request)
    {
        $file = $request->files->get("image");
        $folder = $this->get('kernel')->getRootDir() .'\..\src\AppBundle\Resources\private\uploads\images';
        $dir = '../src/AppBundle/Resources/private/uploads/images';
        $nombre_fichero = $this->get('kernel')->getRootDir() .'\..\src\AppBundle\Resources\private\uploads\images\1.jpg';
        $porcentaje = 0.5;

        if(!is_null($file)){
            // generate a random name for the file but keep the extension
            $filename = uniqid().".".$file->getClientOriginalExtension();
            $file->move($dir,$filename); // move the file to a path
            $status = array('status' => "success","fileUploaded" => true);
        }else{
            $status = array('status' => "error","fileUploaded" => false);
        }
        /*move_uploaded_file($image,'\1.jpg');

// Tipo de contenido

// Obtener los nuevos tamaños
        list($ancho, $alto) = getimagesize($nombre_fichero);
        $nuevo_ancho = $ancho * $porcentaje;
        $nuevo_alto = $alto * $porcentaje;

// Cargar
        $thumb = imagecreatetruecolor($nuevo_ancho, $nuevo_alto);
        $origen = imagecreatefromjpeg($nombre_fichero);

// Cambiar el tamaño
        $realizado = imagecopyresampled($thumb, $origen, 0, 0, 0, 0, $nuevo_ancho, $nuevo_alto, $ancho, $alto);
        $realizado =move_uploaded_file($thumb,'\1('.$nuevo_ancho.'x'.$nuevo_alto.').jpg');

// Imprimir
        $im = file_get_contents($nombre_fichero);
        //$imdata = base64_encode($thumb);

// Format the image SRC:  data:{mime};base64,{data};*/

        return new JsonResponse($status);
    }

    protected function restAction(Request $request)
    {
        // TODO: Implement restAction() method.
    }


    /**
     * @Route("/upload/image/")
     * @Method({"GET"})
     */
    public function renderAction(Request $request)
    {
        return new Response("<html><body><form method='post' enctype='multipart/form-data' action='/Proevend/web/app_dev.php/file/update/image/thumbnail'><input type='file' name='image' id='image' /> <button type='submit'>Enviar</button></form></body></html>");
    }

    protected function callAction(Request $request)
    {
        // TODO: Implement callAction() method.
    }

}
