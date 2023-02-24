<?php

namespace App\Entity;

use App\Interfaces\PasswordProtectedInterface;
use App\Interfaces\UserInterface;

class User extends BaseEntity implements UserInterface, PasswordProtectedInterface
{
    private ?int $id;
    private string $username;
    private string $password;
    private string $email;
    private $roles;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return User
     */
    public function setId(int $id): User
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }

    /**
     * @param string $username
     * @return User
     */
    public function setUsername(string $username): User
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return User
     */
    public function setEmail(string $email): User
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return array
     */
    public function getRoles()
    {
        $roles = $this->roles;
        return $roles;
    }

    /**
     * @param array $roles
     * @return User
     */
    public function setRoles($roles): User
    {
        $this->roles = $roles;
        return $this;
    }

    public function setPassword($password): User
    {
        $this->password = $password;
        return $this;
    }
    public function getHashedPassword(): string
    {
        return 'coucou';
    }

    public function passwordMatch(string $plainPwd): bool
    {
        return $plainPwd === $this->password;
    }
}
