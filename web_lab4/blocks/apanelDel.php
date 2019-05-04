<?php
   require_once "functions/setNews.php";
   $news = getNews();
   echo "<hr>";
   for ($i = 0; $i < count($news); $i++){
      echo "<div class=\"row\">",
               "<div class=\"post col-sm-9 offset-sm-1 col-md-7 offset-md-2\">
                  <p class=\"post_title\">",
                     $news[$i]["Title"],
               "</p></div>",
               "<div class=\"post col-sm-1 col-md-1\">",
                  "<a data-info='{\"id\":".$news[$i]["id"]."}' class=\"dellinks\">X</a>",
               "</div>",
            "</div>";
      if($i != count($news) - 1)
         echo "<hr>";
   }
?>
