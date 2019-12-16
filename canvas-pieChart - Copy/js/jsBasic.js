


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

var xNorm = 300;
var yNorm = 800;
var graphSpacer = 50;
var itemWidth = 50;
var prevDataX = 0;
var curHeight = yNorm;
var tweenTime = 1;

var colR = 255;
var colG = 0;
var colB = 0;

var arcStart = -0.5;
var curArcStart = 0;
var prevArcStart = 0;

var clipRegion = 0;
var thisArcEnd = 0;
/* **************** close create data set ******************* */

// data set variable
var dataReturned = eval(dataSet);
var totalAmount = 0;
for(var i=0; i<dataSet.people.length; i++) {

var thisDist = yNorm - dataSet.people[i].amount;

dataSet.people[i]["heightDiff"] = 0;
dataSet.people[i]["colR"] = 255;
dataSet.people[i]["colG"] = 0;
dataSet.people[i]["colB"] = 0;
dataSet.people[i]["topAmount"] = false;
dataSet.people[i]["arcStart"] = 0;
dataSet.people[i]["arcEnd"] = 0;

totalAmount += dataSet.people[i].amount;

for(var j=0; j<dataSet.people.length; j++) {



  if (dataSet.people[i].amount < dataSet.people[j].amount) {
    dataSet.people[i]["topAmount"] = false;
  } else {
    dataSet.people[i]["topAmount"] = true;
  }
  
}

var thisData = dataSet.people[i];

thisArc = map(thisData.amount,0,totalAmount,0,2,true);

dataSet.people[i]["arcStart"] = arcStart + curArcStart;
dataSet.people[i]["arcEnd"] = arcStart + curArcStart + thisArc;

curArcStart = arcStart + thisArc;

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

  
  

  c.save();
  c.translate(600,600);
  c.beginPath();
  c.fillStyle = 'red'
  c.arc(0,0,300,0,Math.PI*clipRegion,false);
  c.fill();
  c.restore();
  clipRegion+=0.1;

/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */


