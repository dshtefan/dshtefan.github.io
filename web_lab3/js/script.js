$(function() {
  document.getElementById('body').innerHTML = '<canvas id="canvas" style="display: block;"></canvas>';
  var imgs = new Array();
  var startx = window.innerWidth / 2 - 300,
      starty = 20;


  for (var i = 0; i < 4; i++) {
    imgs[i] = new Image();
  }
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
  function getImgs() {
    $.ajax({
          url: "https://api.unsplash.com/photos/random",
          data: {
          	client_id: 'da96c0b1fb1420a7896268dd3dfa36e879766536472eba23f241b8334be25f07',
            count: 4,
            orientation: 'squarish',
            collections: '357786'
          }
        })
        .done(function(data) {
          for (var i = 0 ; i < 4; i++) {
            imgs[i].src = data[i].urls.regular;
          }
    	})
  }
  function drawImg(img, sx, sy, swidth, sheight, x, y, width, height){
    var 
        canv1= document.getElementById('canvas'),
        ctx1 = canv.getContext('2d');
    ctx1.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
  }
  function drawImgs(){
    imgs[0].onload = function(){
      drawImg(imgs[0], imgs[0].naturalWidth / 2 - imgs[0].naturalWidth / 4, 0, imgs[0].naturalWidth / 2,
        imgs[0].naturalHeight, startx + 0, starty + 0, 200, 400);
    };
    imgs[1].onload = function(){
      drawImg(imgs[1], 0, 0, imgs[1].naturalWidth, imgs[1].naturalHeight,
        startx + 200, starty + 0, 400, 400);
    };
    imgs[2].onload = function(){
        drawImg(imgs[2], 0, 0, imgs[2].naturalWidth, imgs[2].naturalHeight,
          startx + 0, starty + 400, 200, 200);
      };
      imgs[3].onload = function(){
        drawImg( imgs[3], 0, imgs[3].naturalHeight / 2 - imgs[3].naturalHeight / 4, imgs[3].naturalWidth,
          imgs[3].naturalHeight / 2, startx + 200, starty + 400, 400, 200);
      }
  }


  getImgs();
  drawImgs();
})
 