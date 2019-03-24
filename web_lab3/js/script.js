$.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "ru",
        format: "jsonp"
      }
    })
    .done(function(data) {
    	document.getElementById('text').innerHTML='<h3>' + data.quoteText + '</h3><h3><em>'+
    	data.quoteAuthor + '</em><h3>';
	})
$.ajax({
      url: "https://api.unsplash.com/photos/random",
      data: {
      	client_id: '7cebdd25191337c65db5e323ec502b93ed17b6b08ecd2a520ba3d98f5104f9f9'
      }
    })
    .done(function(data) {
    	document.getElementById('img').innerHTML+= '<img src="' + data.urls.small + '" />';
	})

 