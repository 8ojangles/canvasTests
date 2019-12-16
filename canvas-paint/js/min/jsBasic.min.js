

// housekeeping
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');
    
    canvas.width = 1000;
    canvas.height = 800;


 
var colorVal = 'rgb(0,0,0)';
var brushSizeVarOutput = 1;

var brushShapeOutput = 'circle';


$(function(){
    var currentValue = $('#brushCurVal');
    $('#brushSize').change(function(){
        currentValue.html(this.value);

        brushSizeVarOutput = currentValue.html();
    });
    // Trigger the event on load, so
    // the value field is populated:
    $('#brushSize').change();

});

$('.brushShape').click(function(){
  $('.brushShape.on').removeClass('on');
  $(this).addClass('on');

  if ($(this).hasClass('circleBrush')) {
    brushShapeOutput = 'circle';
  }

  if ($(this).hasClass('squareBrush')) {
    brushShapeOutput = 'square';
  }

});



/* **************** Draw Function ********************* */

function draw() {
// Housekeeping

// frame rate
  frameRate = 60;
// Each frame reset color overlay mode
  c.globalCompositeOperation = 'source-over';
// clearRect  
//  c.fillStyle = 'rgba(0,0,0,1)';
//  c.clearRect(0,0,canvas.width,canvas.height);



if ((mouseDown)&&(mouseX > 0)&&(mouseX < canvas.width)&&(mouseY > 0)&&(mouseY < canvas.height))
    
    {
    // c.line(lastMouseX,lastMouseY,mouseX,mouseY);
      c.fillStyle =  colorVal;

      if (brushShapeOutput == 'circle') {
        c.fillCircle(mouseX,mouseY,brushSizeVarOutput);
      } else if (brushShapeOutput == 'square') {
        var brushDist = brushSizeVarOutput/2;
        c.fillRect(mouseX-brushDist,mouseY-brushDist,brushSizeVarOutput,brushSizeVarOutput);
      }
    }

/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */


$('.colorBox li').click(function(){
  $('.colorBox li.on').removeClass('on');
  $(this).addClass('on');

  if ($(this).hasClass('red')) {
    colorVal = 'rgb(255,0,0)';
  }

  if ($(this).hasClass('green')) {
    colorVal = 'rgb(0,255,0)';
  }

  if ($(this).hasClass('blue')) {
    colorVal = 'rgb(0,0,255)';
  }

  if ($(this).hasClass('yellow')) {
    colorVal = 'rgb(255,255,0)';
  }

  if ($(this).hasClass('purple')) {
    colorVal = 'rgb(255,0,255)';
  }

  if ($(this).hasClass('grey')) {
    colorVal = 'rgb(130,130,130)';
  }

  if ($(this).hasClass('white')) {
    colorVal = 'rgb(255,255,255)';
  }

  if ($(this).hasClass('black')) {
    colorVal = 'rgb(0,0,0)';
  }

});



$('.clearBtn').click(function(){
  c.clearRect(0,0,canvas.width,canvas.height);
});

$('.saveBtn').click(function(){

  var picture = canvas.toDataURL('image/png');
  window.open(picture);

  // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  // window.location.href=image;
});

