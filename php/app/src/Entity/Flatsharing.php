<?php

namespace App\Entity;

class Flatsharing extends BaseEntity
{
    private int $id;
    private string $name;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return flatsharing
     */
    public function setId(int $id): flatsharing
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getname(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return flatsharing
     */
    public function setname(string $name): flatsharing
    {
        $this->name = $name;
        return $this;
    }

}
