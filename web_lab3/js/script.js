$(function() {
  function getQuote(){
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
      quote = data.quoteText;
     })
  }

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
    countLoadImgs++;
  }

  function drawImgs(){
    imgs[0].onload = function(){
      drawImg(imgs[0], imgs[0].naturalWidth / 2 - imgs[0].naturalWidth / 4, 0, imgs[0].naturalWidth / 2,
        imgs[0].naturalHeight, 0, 0, 200, 400);
    };
    imgs[1].onload = function(){
      drawImg(imgs[1], 0, 0, imgs[1].naturalWidth, imgs[1].naturalHeight,
         200, 0, 400, 400);
    };
    imgs[2].onload = function(){
        drawImg(imgs[2], 0, 0, imgs[2].naturalWidth, imgs[2].naturalHeight,
          0, 400, 200, 200);
      };
      imgs[3].onload = function(){
        drawImg( imgs[3], 0, imgs[3].naturalHeight / 2 - imgs[3].naturalHeight / 4, imgs[3].naturalWidth,
          imgs[3].naturalHeight / 2, 200, 400, 400, 200);
      }
  }

  function drawQuote(){ 
    if (quote != '' && countLoadImgs == 4){
      var 
          canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d');

      context.fillStyle = 'white';
      context.font = "italic 20pt Arial";
      context.fillText(quote, 0, 200)
      console.log(quote);
      return;
    }
    else{
       setTimeout(drawQuote, 1);  
    }
  }

  document.getElementById('body').innerHTML = '<canvas id="canvas" style="display: block;"></canvas>';
  var 
      canv= document.getElementById('canvas'),
      ctx = canv.getContext('2d'),
      quote = '',
      imgs = new Array(),
      countLoadImgs = 0;


  for (var i = 0; i < 4; i++)
    imgs[i] = new Image();

  canv.width = 600;
  canv.height = 600;

  getImgs();
  drawImgs();
  getQuote();
  drawQuote();
})
 