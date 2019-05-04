<?php
   $err = "";
   if(trim($_POST['title'])  == "" && trim($_POST['text'])  == ""){
      $err = "All fields are not filled";
   }elseif (trim($_POST['title'])  == "") {
      $err = "MISSING_TITLE";
   }elseif (trim($_POST['text'])  == "") {
      $err = "MISSING_TEXT";
   }

   if ($err != ""){
      echo $err;
      exit;
   }

   require_once "connect.php";
   connectDB();
   global $mysqli;
   $sql = "INSERT INTO News (Title, Text)
      VALUES (\""
         .$_POST['title'].
         "\", \""
         .$_POST['text'].
      "\")";
   if ($mysqli->query($sql) === TRUE) {
      echo true;
   } else {
      echo "Error: " . $sql . "<br>" . $mysqli->error;
   }
   closeDB();
?>
