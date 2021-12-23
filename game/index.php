<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tactical tanks</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    
    <h1 style="top: auto; text-align: center;">Tactical tanks</h1>
    <div class="tooltip" id="tool">
        <h2 id="header"class="center">test</h2>
        <div>
            <a>hp: </a><a id="tool1">a1</a><br>
            <a>points: </a><a id="tool2">a2</a><br>
            <a>range: </a><a id="tool3">a2</a><br>
        </div>
        <div>
            <button id="cbut1"></button>
            <button id="cbut2"></button>
        </div> 
    </div>
    <canvas id="can" style="background-color: burlywood; width: 2000px; height: 1000px;"></canvas>
    <?php
    session_start();
    $servername = "localhost";
    $username = "no";
    $password = "no";
    $conn = New mysqli($servername, $username, $password, "tanks");
 
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        $q = "CREATE TABLE IF NOT EXISTS " . $_SESSION["game"] . " ( name TEXT, x INT, y INT,hp INT,range INT,points INT,color TEXT)";
        $res = mysqli_query($conn,$q);
        
        $q = "SELECT * FROM " . $_SESSION["game"];
        $res = mysqli_query($conn,$q);
        if (mysqli_num_rows($res) > 0){
            echo "<div id='php3' class='hidden'>"
            while($row = mysqli_fetch_assoc($res)){
                $stuff = $row["name"] . "|" . $row["x"] . "|" . $row["y"] . "|" . $row["hp"] . "|" . $row["range"] . "|" . $row["points"] . "|" . $row["color"] . ",";
            }
            echo "</div>";
        }
    
        echo "<div id='php1' class='hidden'>". $_SESSION["user"] ."</div>";
        echo "<div id='php2' class='hidden'>". $_SESSION["game"] ."</div>";
    
        echo '<script src="index.js"></script> ';
    }
    ?>
      
    
    
</body>
</html>
