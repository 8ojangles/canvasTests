

/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// set color overlay mode
  c.globalCompositeOperation = 'source-over';
// create background
  c.fillStyle = rgb(0,0,0);
  c.fillRect(0,0,canvas.width,canvas.height);

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
var coordinateStore = [];
var graphDivX = (graphWidth)/50;
var graphDivY = (yNorm - xNorm)/50;
var graphXLabels = (yNorm - xNorm)/100;

var drawAxis = function() {
  c.lineWidth = 1;

  for (var i = 0; i<=graphDivX; i++) {
    if (i%2 == 0) {
      c.strokeStyle = '#555';
    } else {
      c.strokeStyle = '#222';
    }
    c.beginPath();
    c.moveTo(xNorm+(50*i), yNorm+50);
    c.lineTo(xNorm+(50*i), xNorm);
    c.stroke();
  };

  for (var i = 0; i<=graphDivY; i++) {
    if (i%2 == 0) {
      c.strokeStyle = '#555';
    } else {
      c.strokeStyle = '#222';
    }
    c.beginPath();
    c.moveTo(xNorm-50, yNorm-(50*i));
    c.lineTo(xNorm+graphWidth, yNorm-(50*i));
    c.stroke();
  };

  c.textAlign = "center";
  c.fillStyle = "#ccc";
  c.font = "16pt arial";
// create graph labels
  for (var i = 0; i<=graphWidth; i+=100) {
    c.fillText(i,xNorm+i,yNorm+50);
  };
  for (var i = 0; i<=graphXLabels; i++) {
    c.fillText(i*100,xNorm-50,yNorm-(i*100));
  };

  // create graph axis
  c.strokeStyle = 'white';
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(xNorm, xNorm);
  c.lineTo(xNorm, yNorm);
  c.lineTo(xNorm+graphWidth, yNorm);
  c.stroke();
};


var populateGraph = function() {
c.fillStyle = rgb(255,0,0);

for(var i=0; i<dataSet.people.length; i++) {
  var thisData = dataSet.people[i];
  var curHeight = yNorm - 2 ;

  if (i == 0) {
    var thisDataX = xNorm + graphSpacer;
  } else {
    var thisDataX = prevDataX +itemWidth + graphSpacer;
  }
  var thisDataY = curHeight-thisData.amount;
  prevDataX = thisDataX;

  c.fillCircle(thisDataX, curHeight-thisData.amount, 10);

  coordinateStore.push([thisDataX,thisDataY]);
}

var coordinateStoreLength = coordinateStore.length;

c.strokeStyle = 'white';
c.lineWidth = 2;

c.beginPath();
c.moveTo(coordinateStore[0][0],coordinateStore[0][1]);
for(var i=1; i<coordinateStoreLength; i++) {
  var coordX = coordinateStore[i][0];
  var coordY = coordinateStore[i][1];
  c.lineTo(coordX,coordY);
}
c.stroke();

};

var xCenter = 100;
var yCenter = 100;

// draw axis
c.save;
c.translate(xCenter,yCenter);
drawAxis();
populateGraph();
c.restore;

/* **************** Start Draw Function (runtime) ********************* */
function draw() {
/* **************** Start Draw Function (runtime) ********************* */

/* **************** Draw Function Housekeeping ************** */
// frame rate
  frameRate = 60;

/* **************** Close Draw Function Housekeeping ******** */


/* **************** Close Draw Function (runtime) ******************** */
};
/* **************** Close Draw Function (runtime) ******************** */

