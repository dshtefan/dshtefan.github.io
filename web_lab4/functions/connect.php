<?php
   $mysqli = false;
   function connectDB(){
      global $mysqli;
      $mysqli = new mysqli("localhost", "root", "", "lab4");
      $mysqli->query("SET NAMES 'utf8'");
      if ($mysqli->connect_error) {
          die("Connection failed: " . $mysqli->connect_error);
      }
   }

   function closeDB(){
      global $mysqli;
      $mysqli->close();
   }
?>
