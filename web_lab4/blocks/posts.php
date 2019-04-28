<div class="main">
   <?php
      require_once "functions/setNews.php";
      $news = getNews();
      for ($i = 0; $i < count($news); $i++){
         echo "<div class=\"post col-sm-10 offset-sm-1 col-md-8 offset-md-2\">
         <p class=\"post_title\">";
         echo $news[$i]["Title"];
         echo "</p><p class=\"post_body\">";
         echo $news[$i]["Text"];
         echo "</p></div>";
         if($i != count($news) - 1)
            echo "<hr>";
      }
   ?>
</div>
