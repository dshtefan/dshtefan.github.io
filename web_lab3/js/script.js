generateHTML();

var
    quote,
    imgs,
    countLoadImgs,
    countDrawImgs,
    canv;

main();

function main(){

  quote = null;
  imgs = new Array();
  countLoadImgs = 0;
  countDrawImgs = 0;
  canv = document.getElementById('canvas');

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
}

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

function getImgs(){
  $.ajax({
    url: "https://api.codetabs.com/v1/proxy",
    data: {
      quest : 'https://api.unsplash.com/photos/random?' + 
            'client_id=38817c5fb9e28bf5f74592a4350fa8d4aff557c0406bdab779f2735e6d13fc31' + '&' +
            'count=4' + '&' + 'orientation=squarish' + '&' + 'collections=769850'
    }
  })
  .done(
    function(data) {
      for (var i = 0; i < 4; i++) {
        imgs[i].src = data[i].urls.small;
        imgs[i].onload = function(){
          countLoadImgs++;
        };
      }
   })
}

function drawImg(img, sx, sy, swidth, sheight, x, y, width, height){
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
  countDrawImgs++;
}

function drawImgs(){
  if (countLoadImgs == 4){
    var
        x = 0,
        y = 0,
        ox = 200 + Math.floor(Math.random() + 0.5) * 200,
        oy = 200 + Math.floor(Math.random() + 0.5) * 200,
        h = oy,
        par = [];
    for(var i = 0; i < 2; i++){
      w = ox;
      par = getParams(imgs[i * 2], w, h);
      drawImg(imgs[i * 2], par[0], par[1], par[2], par[3], x, y, w, h);
      x = ox;
      w = 600 - w;
      par = getParams(imgs[i * 2 + 1], w, h);
      drawImg(imgs[i * 2 + 1], par[0], par[1], par[2], par[3], x, y, w, h);
      x = 0;
      y = oy;
      h = 600 - h;
    }
  } else{
     setTimeout(drawImgs, 1);  
  }
}

function getParams(img, width, height){
  if (width != height)
    if (width < height)
      return [img.naturalWidth / 2 - img.naturalWidth / 4, 0, img.naturalWidth / 2, img.naturalHeight]
    else 
      return [0, img.naturalHeight / 2 - img.naturalHeight / 4, img.naturalWidth, img.naturalHeight / 2]
  else
    return [0, 0, img.naturalWidth, img.naturalHeight]
}

function cutQuote(context, text, x, y, maxWidth, lineHeight){
      var 
          words = text.split(" "),
          countWords = words.length,
          line = "",
          countRaws = Math.floor(context.measureText(text).width / 550);
          
      y -= (countRaws / 2) * lineHeight;
      for (var n = 0; n < countWords; n++) {
          var 
              testLine = line + words[n] + " ",
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
  if (quote != null && countDrawImgs == 4){
    var context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.font = "italic 20pt Arial";
    context.textAlign = "center";
    cutQuote(context, quote, canvas.width / 2, canvas.height / 2, 550, 40);
  }
  else{
     setTimeout(drawQuote, 1);  
  }
}

function generateHTML(){
  var 
    canvas = document.createElement('canvas'),
    body = document.getElementById('body'),
    input = document.createElement('input');

  canvas.id = 'canvas';
  body.appendChild(canvas);
  body.innerHTML = body.innerHTML + 
                  '<div>' + 
                    '<input type="button" value="Save" OnClick="clickSave();">' +
                    '<input type="button" value="Next" OnClick="clickNext();">' +
                  '</div>';
}

function clickSave(){
  var 
      canv= document.getElementById('canvas');
      dataURL = canv.toDataURL("image/jpg");
      link = document.createElement("a");

  link.href = dataURL;
  link.download = "quote.jpg";
  link.click();
}

function clickNext(){
  main();
}
