<?php

   require_once "connect.php";

   function getNews(){
      global $mysqli;
      connectDB();
      $data = $mysqli->query("SELECT * FROM News ORDER BY id DESC");
      closeDB();
      return dataToArray($data);
   }

   function dataToArray($data){
      $array = array();
      while (($row = $data->fetch_assoc())) {
         $array[] = $row;
      }
      return $array;
   }
?>
