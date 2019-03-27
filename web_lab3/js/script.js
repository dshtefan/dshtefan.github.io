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
    .done(
      function(data) {
        quote = data.quoteText;
     })
  }

  function getImgs() {
    $.ajax({
      url: "https://api.codetabs.com/v1/proxy",
      data: {
        quest : 'https://api.unsplash.com/photos/random?' + 
              'client_id=92b75c153abd51b74cd52de760b4ceb2abb7c532b6a5c622bc5268fa1c35209d' + '&' +
              'count=4' + '&' + 'orientation=squarish' + '&' + 'collections=769850'
      }
    })
    .done(
      function(data) {
        for (var i = 0; i < 4; i++) {
          imgs[i].src = data[i].urls.small;
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

  function cutQuote(context, text, x, y, maxWidth, lineHeight){
        var words = text.split(" "),
            countWords = words.length,
            line = "",
            countRaws = Math.floor(context.measureText(text).width / 550);
            
        y -= (countRaws / 2) * lineHeight;
        for (var n = 0; n < countWords; n++) {
            var testLine = line + words[n] + " ",
                testWidth = context.measureText(testLine).width;

            if (testWidth > maxWidth) {
                context.fillText(line, x, y);
                line = words[n] + " ";
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
  }

  function drawQuote(){ 
    if (quote != '' && countLoadImgs == 4){
      var 
          canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d');

      context.fillStyle = 'white';
      context.font = "italic 20pt Arial";
      context.textAlign = "center";
      cutQuote(context, quote, canvas.width / 2, canvas.height / 2, 550, 40);
    }
    else{
       setTimeout(drawQuote, 1);  
    }
  }

  var 
      canvas = document.createElement('canvas'),
      body = document.getElementById('body'),
      input = document.createElement('input');
  
  canvas.id = 'canvas';
  body.appendChild(canvas);
  body.innerHTML = body.innerHTML + 
                  '<div><input type="button" value="Save" OnClick="clickB();"></div>';
  var 
      canv = document.getElementById('canvas'),
      ctx = canv.getContext('2d'),
      quote = '',
      imgs = new Array(),
      countLoadImgs = 0;


  for (var i = 0; i < 4; i++){
    imgs[i] = new Image();
    imgs[i].crossOrigin="anonymous";
  }

  canv.width = 600;
  canv.height = 600;

  getImgs();
  drawImgs();
  getQuote();
  drawQuote();
})

function clickB(){
  var 
      canv= document.getElementById('canvas');
  var dataURL = canv.toDataURL("image/jpg");
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "quote.jpg";
  link.click();
 }
