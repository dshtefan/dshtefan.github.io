$(function() {
  document.getElementById('body').innerHTML = '<canvas id="canvas" style="display: block;"></canvas>'
  var img = new Image();
  var x = 0,
      y = 0,
      dx = 200,
      dy = 200;

    canv= document.getElementById('canvas'),
    ctx = canv.getContext('2d');

  canv.width = window.innerWidth;
  canv.height = window.innerHeight;


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
      	document.getElementById('canvas').innerHTML='<h3>' + data.quoteText + '</h3><h3><em>'+
      	data.quoteAuthor + '</em><h3>';
  	})
  function getImg() {
    $.ajax({
          url: "https://api.unsplash.com/photos/random",
          data: {
          	client_id: '4385b440d6c0e7e8f89d77fd80d32f2a6fb25fb70c3b3e2a7cf629bb3dd0be99'
          }
        })
        .done(function(data) {
          img.src = data.urls.small;
    	})
  }
 
  getImg();
  drawImg();
  getImg();
  drawImg();
  

  function drawImg(){
    img.onload = function(){
      var 
        canv1= document.getElementById('canvas'),
        ctx1 = canv.getContext('2d');

      ctx1.drawImage(img, x, y, 200, dy);
      x = x + 200;
    }
  }
})
 