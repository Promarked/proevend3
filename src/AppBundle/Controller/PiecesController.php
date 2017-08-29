<?php

namespace AppBundle\Controller;

use AppBundle\Controller\Abstracts\RestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

/**
 * @Route("/app/piece")
 */
class PiecesController extends RestController
{
    /**
     * @Route("/mosaic.htm")
     * @Method({"GET"})
     */
    public function mosaicAction()
    {
        return $this->render('@App/Pieces/mosaic.piece.twig');
    }

    /**
     * @Route("/options.htm")
     * @Method({"GET"})
     */
    public function optionsAction()
    {
        return $this->render('@App/Pieces/options.piece.twig');
    }

    /**
     * @Route("/datatable.htm")
     * @Method({"GET"})
     */
    public function datatableAction()
    {
        return $this->render('@App/Pieces/datatable.piece.twig');
    }



    public function callAction(Request $request)
    {
        // TODO: Implement callAction() method.
    }



    protected function renderAction(Request $request)
    {
        // TODO: Implement renderAction() method.
    }

    protected function restAction(Request $request)
    {
        // TODO: Implement restAction() method.
    }


}
