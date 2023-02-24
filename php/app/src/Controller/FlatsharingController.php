<?php

namespace App\Controller;

use App\Factory\PDOFactory;
use App\Manager\FlatsharingManager;
use App\Manager\TokenManager;
use App\Route\Route;
use DateTimeImmutable;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;

class FlatsharingController extends AbstractController
{
    #[Route('/flatsharing/create', name: "flatsharing", methods: ["POST"])]
    public function flatsharing()
    {   
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new FlatsharingManager(new PDOFactory());
        $name = $_POST['name'];
        var_dump($name);
        $manager->CreateFlatsharing($id, $name);
        var_dump('created');
        exit;
    }
    
    #[Route('/flatsharing/get', name: "userflatsharing", methods: ["GET"])]
    public function userflatsharing()
    {
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new FlatsharingManager(new PDOFactory());
        $flatsharing = $manager->getUserFlatsharing($id);
        echo json_encode($flatsharing);
        exit;

    }
}
