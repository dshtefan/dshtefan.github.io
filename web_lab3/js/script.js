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
                'client_id=93d496ca0d56955281ca9a8ec2b1a87610bdc2ff60d2edbbe38982ffc123ac2d' + '&' +
                'count=4' + '&' + 'orientation=squarish'
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

      //Blackout
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0,0,600,600);
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
    context.font = "italic 22pt Arial";
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
    save = document.createElement('button'),
    next = document.createElement('button'),
    div = document.createElement('div'),
    dbox = document.createElement('div');

  canvas.id = 'canvas';

  div.style.width = '600px';
  dbox.style.width = '600px';
  dbox.style.position= 'absolute';
  dbox.style.top= '50%';
  dbox.style.left= '50%';
  dbox.style.margin= '-320px 0 0 -320px';

  //"Save" button styles
  save.id = 'save';
  save.innerHTML = 'Save';
  save.style.backgroundColor = '#4CAF50';
  save.style.border = 'none';
  save.style.color =  'white';
  save.style.padding = '10px 25px';
  save.style.fontSize = '16px';
  save.onclick = 
    function(){
      var 
          canv= document.getElementById('canvas');
          dataURL = canv.toDataURL("image/jpg");
          link = document.createElement("a");

      link.href = dataURL;
      link.download = "quote.jpg";
      link.click();
    };

  //"Next" button styles
  next.id = 'next';
  next.onclick = function () { main(); };
  next.innerHTML = 'Next';
  next.style.backgroundColor = 'white';
  next.style.color =  'black';
  next.style.padding = '8px 23px';
  next.style.fontSize = '16px';
  next.style.border = '2px solid #008CBA';
  next.style.marginLeft = "430.62px";

  div.appendChild(canvas);
  div.appendChild(save);
  div.appendChild(next);
  dbox.appendChild(div);
  body.appendChild(dbox);
}

