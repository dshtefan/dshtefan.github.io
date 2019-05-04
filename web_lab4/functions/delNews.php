<?php
   require_once "connect.php";
   connectDB();
   global $mysqli;
   $sql = "DELETE FROM News WHERE id =".$_POST['id'];
   if ($mysqli->query($sql) === TRUE) {
      echo true;
   } else {
      echo "Error: " . $sql . "<br>" . $mysqli->error;
   }
   closeDB();
?>
