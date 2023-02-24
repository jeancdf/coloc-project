<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div class="sign_div">
    <h2>Sign up</h2>
        <form action="" method="POST" class ="signup">
        Username :
        <input type="text" name="username"><br>

        email :
        <input type="text" name="email"><br>
        firstName :
        <input type="text" name="firstname"><br>
        lastName  :
        <input type="text" name="lastname"><br>
        Is admin ? : 
        <input type='checkbox' name='admin' value='off'><br>
        Gender: 
        <select name="gender" id="gender">
            <option value="">--Please choose an option--</option>
        <option value="male">male</option>
        <option value="female">female</option>
        </select>
        <br>
   

        Password :
        <input type="password" name="password"><br>

        <br>
        <button class="btn" type="submit" name="register_btn">Sign-up</button>
        </form>
</div>
</body>
</html>