<?php

namespace App\Manager;

use App\Entity\Participants;

class ParticipantManager extends BaseManager
{

    // invite participants
    public function inviteUserToFlatsharing($name,$user)
    {
        $id = $this->pdo->query("select id from users WHERE userName='$name'");
        $user_Id = $id->fetch(\PDO::FETCH_ASSOC);
        $user_Id = $user_Id['id'];
        $flatsharing = $this->pdo->query("select id from flatsharing WHERE id=(select flatsharing_id from participants WHERE user_id='$user')");
        $flatsharing_id = $flatsharing->fetch(\PDO::FETCH_UNIQUE);
        $flatsharing_id = $flatsharing_id['id'];
        $query = $this->pdo->query("INSERT INTO participants(user_id, flatsharing_id, accepted) VALUES ('$user_Id','$flatsharing_id', false)");
        return new Participants($query->fetch(\PDO::FETCH_DEFAULT));
    }

    // accept invite 
    public function acceptFlatsharingInv($id,$flatsharing_Id)
    {
        $this->pdo->query("UPDATE participants SET accepted = true WHERE flatsharing_id='$flatsharing_Id' AND user_id='$id'");
    }

    // decline invite
    public function declineFlatsharingInv($id,$flatsharing_Id)
    {
        $this->pdo->query("UPDATE participants SET accepted = false WHERE flatsharing_id='$flatsharing_Id' AND user_id='$id'");
    }

    // Get invitations
    public function getFlatsharingInvitations($user_Id)
    {
        $query = $this->pdo->query("select * from participants WHERE user_id='$user_Id' AND accepted=false");

        $flatsharing = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $flatsharing[] = [$data['user_id'],$data['flatsharing_id'],$data['accepted']];
        }

        return $flatsharing;
    }
}
