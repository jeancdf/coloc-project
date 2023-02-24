<?php

namespace App\Manager;

use App\Entity\Post;

class PostManager extends BaseManager
{
    /**
     * @return Post[]
     */
    public function getAllPosts(): array
    {
        $query = $this->pdo->query("select * from Post");

        $users = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = [$data['content'],$data['lastUpdated']];
        }

        return $users;
    }

    public function getAllComments($postId)
    {
        $query = $this->pdo->query("select * from Comment WHERE postId='$postId'");
        $users = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {
            $users[] = $data;
        }

        return $users;
    }

    public function getPost($id)
    {
        $query = $this->pdo->query("select * from Post WHERE id='$id'");
        return new Post($query->fetch(\PDO::FETCH_DEFAULT));   
    }

    public function deletePost($idToDelete)
    {
       $this->pdo->query("DELETE FROM `Post` WHERE id='$idToDelete'");
    }
    public function updatePost($idToUpdate,$content)
    {
        $this->pdo->query("UPDATE Post
        SET content = '$content' WHERE id='$idToUpdate'");
    }
    public function createPost($id,$content)
    {
        $this->pdo->query("INSERT INTO Post(content, author ) VALUES ('$content','$id')");
    }
}
