<?php

namespace App\Manager;

use App\Entity\Expenses;

class ExpensesManager extends BaseManager
{

   
    public function addExpenses($user_Id, $date, $description, $amount)
    {
        $flatsharing = $this->pdo->query("select id from flatsharing WHERE id=(select flatsharing_id from participants WHERE user_id='$user_Id' AND accepted=true)");
        $flatsharing_id = $flatsharing->fetch(\PDO::FETCH_UNIQUE);
        $flatsharing_id = $flatsharing_id['id'];
        $query = $this->pdo->query("INSERT INTO expenses(user_id, flatsharing_id, date, description, amount) VALUES ('$user_Id','$flatsharing_id', '$date', '$description', '$amount')");
        
    }
    public function deleteExpenses($user_Id, $date)
    {
        $query = $this->pdo->query("DELETE FROM expenses WHERE user_id = '$user_Id' AND date = '$date'");
        
    }
    public function viewExpenses($user_Id)
    {

        $flatsharing = $this->pdo->query("select id from flatsharing WHERE id=(select flatsharing_id from participants WHERE user_id='$user_Id' AND accepted=true)");
        $flatsharing_id = $flatsharing->fetch(\PDO::FETCH_UNIQUE);
        $flatsharing_id = $flatsharing_id['id'];
        $query = $this->pdo->query("SELECT * FROM expenses WHERE flatsharing_id = '$flatsharing_id'");
        $expenses = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $expenses[] = [$data['flatsharing_id'],$data['amount'],$data['description'],$data['date']];
        }

        return $expenses;
        
    }

    


}
