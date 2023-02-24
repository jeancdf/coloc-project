

 <style> .card {
    padding: 5px;
 margin: 5px;
 border: 1px solid black;
 border-radius:3px;
 background-color:rgba(180, 180, 180, 0.501) ;
 width: 50%;

}
</style> 
<?php /** @var App\Entity\User $user */ ?>
<?php if ($_SESSION){
    echo '<a href="/logout">Logout</a>';
    }else{
        echo '<a href="/login">Log in</a>';
    }?>
<h1><?= $trucs; ?></h1>
    <?php if ($_SESSION){
    echo '<form action="" method="POST">
        <input type="text" placeholder="content" name="content">
        <button class="btn" type="submit" name="post_btn" >Create</button>
        </form>';
    };?>
<?php
/** @var App\Entity\Post[] $posts */
foreach ($posts as $post) {
    echo '<div class="card">'. $post->getContent().'</div>';
    if ( $_SESSION && ($post->getAuthor() == $_SESSION["id"] || $_SESSION["admin"] == 1)) {
        $id = $post->getId();
        echo '<button class="btn" type="submit" name="post_btn"><a href="/post/'.$id.'/delete">delete</a></button>';
        echo '<button class="btn" type="submit" name="post_btn"><a href="/post/'.$id.'/update">Update</a></button>';
    }
}


