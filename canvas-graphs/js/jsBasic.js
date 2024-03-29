


/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

/* ****************  close housekeeping ********************* */

/* ****************  create data set ********************* */

var dataSet = {"people" : [
  {"name" : "Andy", "amount" : 100},
  {"name" : "Ben", "amount" : 500},
  {"name" : "Candice", "amount" : 200},
  {"name" : "Denise", "amount" : 400},
  {"name" : "Ewan", "amount" : 300},
  {"name" : "Frank", "amount" : 250},
  {"name" : "Georgina", "amount" : 320}
  ]
}


// create vars for axiz Zero (0)

var xNorm = 100;
var yNorm = 600;
var graphWidth = 700;
var graphSpacer = 50;
var itemWidth = 50;
var prevDataX = 0;
var curHeight = yNorm;
var tweenTime = 1;

var colR = 255;
var colG = 0;
var colB = 0;

/* **************** close create data set ******************* */

// data set variable
var dataReturned = eval(dataSet);

for(var i=0; i<dataSet.people.length; i++) {

var thisDist = yNorm - dataSet.people[i].amount;

dataSet.people[i]["heightDiff"] = 0;
dataSet.people[i]["colR"] = 255;
dataSet.people[i]["colG"] = 0;
dataSet.people[i]["colB"] = 0;

};

var drawAxis = function() {

  // create bar graph axis

  c.strokeStyle = 'white';
  c.lineWidth = 4;

// start the path
  c.beginPath();
// define the first point
  c.moveTo(xNorm, xNorm);
// define the next point
  c.lineTo(xNorm, yNorm);
// define the next point
  c.lineTo(xNorm+graphWidth, yNorm);
// stroke the path
  c.stroke();

};


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

// draw axis

drawAxis();


  for(var i=0; i<dataSet.people.length; i++) {
    var thisData = dataSet.people[i];
    var curHeight = yNorm - 2 ;

    if (i == 0) {
      var thisDataX = xNorm + graphSpacer;
    } else {
      var thisDataX = prevDataX +itemWidth + graphSpacer;
    }

    var thisDataY = yNorm - thisData.heightDiff;

    prevDataX = thisDataX;

    var colorChange;

    colorChange = map(thisData.amount,0,500,0,255,true);

    c.strokeStyle = rgb(thisData.colR,thisData.colG,thisData.colB);
    c.lineWidth = itemWidth;


    c.beginPath();
  // define the first point
    c.moveTo(thisDataX, curHeight);
  // define the next point
    c.lineTo(thisDataX, curHeight - thisData.heightDiff);

  // stroke the path
    c.stroke();

    if (thisData.heightDiff < thisData.amount) {
      thisData.heightDiff+=5;
    } else {
      thisData.heightDiff = thisData.amount;
    }

    if (thisData.colG < colorChange) {
      thisData.colG += 3;
    }

    if (thisData.colB < colorChange) {
      thisData.colB += 3;
    }

  }

/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */


