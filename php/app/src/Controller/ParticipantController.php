<?php

namespace App\Controller;

use App\Factory\PDOFactory;
use App\Route\Route;
use DateTimeImmutable;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use App\Manager\TokenManager;
use App\Manager\ParticipantManager;

class ParticipantController extends AbstractController
{
    #[Route('/participant/invite', name: "inviteParticipant", methods: ["POST"])]
    public function inviteParticipant()
    {   
        $tokenManager = new TokenManager();
        $id = $tokenManager->checkToken(getallheaders()['authorization']);
        if (!$id) {
            exit;
        }
        $participants = $_POST['name'];
        $manager = new ParticipantManager(new PDOFactory());
        $manager->inviteUserToFlatsharing($participants, $id);
        var_dump('invited');
        exit;
    }
    #[Route('/participant/accept', name: "acceptParticipant", methods: ["POST"])]
    public function acceptParticipant()
    {
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new ParticipantManager(new PDOFactory());
        $flatsharing_Id = $_POST['flatsharing_Id'];
        $manager->acceptFlatsharingInv($id, $flatsharing_Id);
        var_dump('accepted');
        exit;
    }
    #[Route('/participant/decline', name: "declineParticipant", methods: ["POST"])]
    public function declineParticipant()
    {
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new ParticipantManager(new PDOFactory());
        $flatsharing_Id = $_POST['flatsharing_Id'];
        $manager->declineFlatsharingInv($id, $flatsharing_Id);
        var_dump('declined');
        exit;
    }

    #[Route('/participant', name: "participant", methods: ["GET"])]
    public function participant()
    {
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new ParticipantManager(new PDOFactory());
        $list = $manager->getFlatsharingInvitations($id);
        echo json_encode($list);
        exit;
    }
}