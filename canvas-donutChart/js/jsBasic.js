/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// init counter
var counter = 0;

/* ****************  close housekeeping ******************* */

/* ****************  create variables ********************* */

// store canvas center coords
var midX = canvas.width/2;
var midY = canvas.height/2;

// create graph centers and link to window center
var thisCenterX = midX;
var thisCenterY = midY;

var thatCenterX = midX + 300;
var thatCenterY = midY;

var thisMoveLeft = 300;

// create anim trigger (animStart), anim delay (animDelay) vars
var animStart = false;
var animDelay = 0;
var animDelayLength = 60;
var animDelayStart = false;
var animDelayFin = false;
var anim2Start = false;

var graph1Alpha = 0;
var graph2Alpha = 0;

// create arc radius based on proportion of window height
var radius = canvas.height/4;

// normalise arc zero to straight up
var arcZero = Math.PI*-0.5;

////////// create dummy data for graphs. convert to usable values //////
var thisDataVal = 35;
var thatDataVal = 80;

// create arc end angle to manipulate in animation
var thisArcEnd = arcZero;
var thatArcEnd = arcZero;

// create text values for graph

var textValFont = "80pt Arial";
var textFont = "20pt Arial";

// graph 1 values
var thisTextVal = 0;
var thisText = "of people who voted";

//  graph 2 values
var thatTextVal = 0;
var thatText = "voted to stay";


/* **************** Start Draw Function ********************* */
function draw() {
/* **************** Start Draw Function ********************* */

/* **************** Draw Function Housekeeping ************** */
// frame rate
  frameRate = 60;
// Each frame reset color overlay mode
  c.globalCompositeOperation = 'source-over';

  // background
  c.fillStyle = rgb(0,0,0);
  c.fillRect(0,0,canvas.width,canvas.height);

/* **************** Close Draw Function Housekeeping ******** */

// graph 1 
c.lineWidth = 80;
c.strokeStyle = rgba(66, 143, 244, graph1Alpha);

c.beginPath();
c.arc(thisCenterX,thisCenterY,radius,0,Math.PI*2, true);
c.stroke();

c.strokeStyle = rgba(39, 88, 153, graph1Alpha);
c.beginPath();
c.arc(thisCenterX,thisCenterY,radius,arcZero,thisArcEnd, false);
c.stroke();

c.font = textValFont;
c.fillStyle = rgba(66, 143, 244, graph1Alpha);
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(thisTextVal+"%",thisCenterX,thisCenterY-20);
c.font = textFont;
c.fillText(thisText,thisCenterX,thisCenterY+40);

// graph 2 
c.lineWidth = 80;
c.strokeStyle = rgba(66, 143, 244, graph2Alpha);

c.beginPath();
c.arc(thatCenterX,thatCenterY,radius,0,Math.PI*2, true);
c.stroke();

c.strokeStyle = rgb(39, 88, 153, graph2Alpha);
c.beginPath();
c.arc(thatCenterX,thatCenterY,radius,arcZero,thatArcEnd, false);
c.stroke();

c.font = textValFont;
c.fillStyle = rgba(66, 143, 244, graph2Alpha);
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(thatTextVal+"%",thatCenterX,thatCenterY-20);
c.font = textFont;
c.fillText(thatText,thatCenterX,thatCenterY+40);

// wait for animation start trigger then animate arc end to data value

if (!animStart && counter >= 60) {
  if (graph1Alpha < 1)
    graph1Alpha += 0.032;
}


if (!animStart && counter == 120) {
  animStart = true;
}

if (animStart) {
  if (thisTextVal < thisDataVal) {
    thisTextVal += 1;
    // map  arc radian value to thisTextVal
    thisArcEnd = Math.PI*(-0.5 + (2/100 * thisTextVal))
  }
}

if (thisTextVal == thisDataVal && !animDelayStart) {
  animDelayStart = true;
}

if (animDelayStart) {
  animDelay += 1;
}

if (animDelay == animDelayLength) {
  animDelayFin = true
}

if (animDelayFin){
  if (midX - thisCenterX < thisMoveLeft) {
    thisCenterX -=10;
  }
}

if (midX - thisCenterX >= thisMoveLeft-100) {
  anim2Start = true;
}

if (anim2Start) {
  if (graph2Alpha <= 1) {
  graph2Alpha += 0.032;
 }
}

if (graph2Alpha >= 1) {
    if (thatTextVal < thatDataVal) {
    thatTextVal += 1;
    // map  arc radian value to thatTextVal
    thatArcEnd = Math.PI*(-0.5 + (2/100 * thatTextVal))
  }
}

counter++;

/* **************** Close Draw Function ******************** */
}
/* **************** Close Draw Function ******************** */


