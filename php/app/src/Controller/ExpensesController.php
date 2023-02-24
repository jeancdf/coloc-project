<?php

namespace App\Controller;

use App\Factory\PDOFactory;
use App\Route\Route;
use App\Manager\ExpensesManager;
use App\Manager\TokenManager;
use App\Route\Rouate;
use DateTime;

class ExpensesController extends AbstractController
{
    #[Route('/expenses/add', name: "expenses", methods: ["POST"])]
    public function expenses()
    {   
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new ExpensesManager(new PDOFactory());
        $date = date('Y-m-d');
        $description = $_POST['description'];
        $amount = $_POST['amount'];
        $expenses = $manager->addExpenses($id, $date, $description, $amount);
        var_dump('added');
        exit;
    }
    #[Route('/expenses/delete', name: "expenses", methods: ["POST"])]
    public function deleteexpenses()
    {   
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new ExpensesManager(new PDOFactory());
        $expenses_id = $_POST['expenses_id'];
        $expenses = $manager->deleteExpenses($id, $expenses_id);
        var_dump('deleted');

    }
    #[Route('/expenses/get', name: "getexpenses", methods: ["GET"])]
    public function getexpenses()
    {   
        $tokenManager = new TokenManager();
        $auth = getallheaders()['authorization'];
        $id = $tokenManager->checkToken($auth);
        if (!$id) {
            exit;
        }
        $manager = new ExpensesManager(new PDOFactory());
        $expenses = $manager->viewExpenses($id);
        echo json_encode($expenses);
        exit;
    }

}
