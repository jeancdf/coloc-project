<?php

namespace App\Entity;

class Participants extends BaseEntity
{
    private int $userId;
    private string $flatsharingId;

    /**
     * @return int
     */
    public function getUserId(): int
    {
        return $this->userId;
    }

    /**
     * @param int $id
     * @return Participants
     */
    public function setUserId(int $userId): Participants
    {
        $this->userId = $userId;
        return $this;
    }

        /**
     * @return int
     */
    public function getFlatsharingId(): int
    {
        return $this->flatsharingId;
    }

    /**
     * @param int $id
     * @return Participants
     */
    public function setFlatsharingId(int $flatsharingId): Participants
    {
        $this->flatsharingId = $flatsharingId;
        return $this;
    }


}