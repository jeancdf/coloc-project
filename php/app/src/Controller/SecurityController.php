<?php

namespace App\Controller;

use App\Factory\PDOFactory;
use App\Manager\UserManager;
use App\Route\Route;
use App\Manager\TokenManager;
use DateTimeImmutable;
use Firebase\JWT\JWT;


class SecurityController extends AbstractController
{
    #[Route('/login', name: "login", methods: ["GET","POST"])]
    public function login()
    {
        if (isset($_POST['password']) || isset($_POST['username'])){
            $formUsername = $_POST['username'];
            $formPwd = $_POST['password'];
            $userManager = new UserManager(new PDOFactory());
            $user = $userManager->getByUsername($formUsername);

            if (!$user) {
                echo 'wrong';
                exit;
            }
            if ($user->passwordMatch($formPwd)) {
                $id = $user->getId();
                $_SESSION["admin"] = $user->getRoles();
                $_SESSION["id"] = $id;
                $secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';
                $issuedAt   = new DateTimeImmutable();
                $expire     = $issuedAt->modify('+6 day')->getTimestamp();      // Ajoute 6 days
                $serverName = "localhost";

                
                $data = [
                    'iat'  => $issuedAt->getTimestamp(),         // Issued at:  : heure à laquelle le jeton a été généré
                    'iss'  => $serverName,                       // Émetteur
                    'nbf'  => $issuedAt->getTimestamp(),         // Pas avant..
                    'exp'  => $expire,                           // Expiration
                    'ID' => $id,                     // Nom d'utilisateur
                ];
                echo JWT::encode(
                    $data,
                    $secretKey,
                    'HS512'
                );
                exit;
            }
        echo 'wrong';
        }
    }
    #[Route('/signup', name: "signup", methods: ["GET","POST"])]
    public function signup() {
        if (isset($_POST['password']) && isset($_POST['username']) && isset($_POST['email']) ){
            $formUsername = $_POST['username'];
            $formPwd = $_POST['password'];
            $formEmail = $_POST['email'];
            $userManager = new UserManager(new PDOFactory());
            $userManager->insertUser($formUsername,$formPwd,$formEmail);
            echo "account created!!!";
        }
        exit;
    }
}