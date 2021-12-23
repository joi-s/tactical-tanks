<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>login/sign up</title>
  <link rel="stylesheet" href="signin.css">
</head>
<body style="background-color:lightgrey">

  <div id="clearable" class='div'>
    <form class='form' method="post">
      <h1 style="text-align:center">Sign in</h1><br>
      <a style="margin-left: 10%">Username: </a><input name="username" type="text"><br>
      <a style="margin-left: 10%">Password: </a><input name="password" type="text"><br>
       <a style="margin-left: 10%">Game: </a><input name="game" type="text"><br>
      <input style="width:40%; margin-left:10%" name="signup" type="submit" value="sign up">
      <input style="width:40%" type="submit" name="login" value="login">
    </form>
  </div>
  <?php
    session_start();
  $servername = "localhost";
  $username = "none your god damn buisnes";
  $password = "none your god damn buisnes";
  $conn = New mysqli($servername, $username, $password, "tanks");
 
 if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
 } else {
  
  $q = "SELECT * FROM users";
  $res = mysqli_query($conn,$q);
  if (isset($_POST['login'])){
    if(isset($_POST['username']) && isset($_POST['password'])){
      if (mysqli_num_rows($res) > 0){
        while($row = mysqli_fetch_assoc($res)){
          if($row['user'] == $_POST['username'] && $row['password'] == $_POST['password']){
            $_SESSION["user"] = $_POST['username'];
            $_SESSION["game"] = $row['game'];
            
            echo '<script>';
            echo 'var test = document.getElementById("clearable")' . PHP_EOL;
            echo 'test.innerHTML = ""';
            echo '</script>'. PHP_EOL;
            
            echo '<div class="div">';
            echo '<form class="form" action="./game">';
            echo '<h1 style="text-align: center">Welcome '. $_SESSION["user"] . '</h1><br>';
            echo '<input style="width: 80%; height:60%; margin-left: 10%; font-size: 5em" type="submit" value="Play">';
            echo '</form>';
            echo '</div>';
          }
        }
      }else{
        echo "failed";
      }
    }
  } else if (isset($_POST['signup'])){
    
  }
  if (mysqli_num_rows($res) > 0){
    while($row = mysqli_fetch_assoc($res)){
      
    }
  }else{
    echo "faild";
  }
  mysqli_close($conn);
}
  ?>
  <form class="hidden" id="former" method="get">
  <input name="user">
  <input name="x">
  <input name="y">
  <input name="hp">
  <input name="range">
  <input name="points">
  <input name="color">
  </form>
</body>
</html>
