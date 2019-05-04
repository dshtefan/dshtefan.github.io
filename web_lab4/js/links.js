var links = document.querySelectorAll(".dellinks");
for(var i = 0, l = links.length; i < l; i++){
    links[i].addEventListener("click", function(){
        var obj = JSON.parse(this.getAttribute("data-info"));
        $.ajax({
        		url:    	'functions/delNews.php',
        		type:		'POST',
        		cache: 		false,
        		data:   	{'id': obj.id},
        		dataType:	'html',
        		success: function(data) {
               window.location.reload();
            }
         });
    });
}
