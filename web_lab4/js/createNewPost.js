$('#send').click (function () {
	var inputTitle = $('#inputTitle').val ();
	var inputText = $('#inputText').val ();
	$.ajax({
		url:    	'functions/addNews.php',
		type:		'POST',
		cache: 		false,
		data:   	{'title':inputTitle, 'text':inputText},
		dataType:	'html',
		beforeSend: function () {
			$('#send').attr ("disabled", "disabled");
		},
		success: function(data) {
			console.log(data);
			if (data == true) {
				$('#inputTitle').val ("");
				$('#inputText').val ("");
				$('#send').text ("Опубликовано");
				$('#inputTitle').css ("border-color", "#60fc8c");
				$('#inputText').css ("border-color", "#60fc8c");
			} else {
				if (data == false)
					alert ("Что-то пошло не так!");
				else {
					switch (data) {
					case "MISSING_TITLE":
   					$('#inputTitle').css ("border-color", "#f7b4b4");
   					break;
					case "MISSING_TEXT":
   					$('#inputText').css ("border-color", "#f7b4b4");
   					break;
					default:
   					$('#inputText').css ("border-color", "#f7b4b4");
   					$('#inputTitle').css ("border-color", "#f7b4b4");
					}
				}
			}
			$('#send').removeAttr ("disabled");
		}
	});
});

document.getElementById('inputTitle').onclick =
   function(){
      document.getElementById('inputTitle').style.borderColor = "#ccc";
   };

document.getElementById('inputText').onclick =
   function(){
      document.getElementById('inputText').style.borderColor = "#ccc";
   };

document.getElementById('send').onclick =
   function(){
      $('#send').text("Отправить");
   };
