<?php

namespace App\Manager;

use App\Entity\Flatsharing;

class FlatsharingManager extends BaseManager
{

    public function getUserFlatsharing($user_id)
    {
        $query = $this->pdo->query("select * from flatsharing WHERE id=(select flatsharing_id from participants WHERE user_id='$user_id' AND accepted=true)");

        $flatsharing = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $flatsharing[] = [$data['id'],$data['name']];
        }

        return $flatsharing;
    }

    public function getFlatsharing($flatsahring_id)
    {
        $query = $this->pdo->query("select * from flatsharing WHERE id='$flatsahring_id'");

        return new Flatsharing($query->fetch(\PDO::FETCH_DEFAULT));
    }


    public function CreateFlatsharing($user_Id,$name)
    {
        $this->pdo->query("INSERT INTO flatsharing(admin_id, name ) VALUES ('$user_Id','$name')"); 
        $id = $this->pdo->query("select id from flatsharing WHERE admin_id='$user_Id' and name='$name'"); 
        $id = $id->fetch(\PDO::FETCH_COLUMN);
        $query = $this->pdo->query("INSERT INTO participants(user_id, flatsharing_id, accepted) VALUES ('$user_Id','$id', True)"); 

    }

}
