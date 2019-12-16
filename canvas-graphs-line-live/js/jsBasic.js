

/* ****************  housekeeping ********************* */

// define the background canvas. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');
// Set Canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// define the live output canvas. define the live output context as 2d
var liveCanvas = document.getElementById('liveOutput'),
    lc = liveCanvas.getContext('2d');
// Set Canvas full screen
    liveCanvas.width = window.innerWidth;
    liveCanvas.height = window.innerHeight;

// set color overlay mode
  c.globalCompositeOperation = 'source-over';

/* ****************  close housekeeping ********************* */

/* ****************  create data set ********************* */

var dataSet = {"people" : [
  {"time" : "2", "amount" : 100},
  {"time" : "4", "amount" : 500},
  {"time" : "6", "amount" : 200},
  {"time" : "8", "amount" : 400},
  {"time" : "10", "amount" : 300},
  {"time" : "12", "amount" : 250},
  {"time" : "14", "amount" : 320},
  {"time" : "16", "amount" : 150},
  {"time" : "18", "amount" : 400},
  {"time" : "20", "amount" : 200},
  {"time" : "22", "amount" : 50},
  {"time" : "24", "amount" : 60},
  {"time" : "26", "amount" : 30},
  {"time" : "28", "amount" : 170},
  {"time" : "30", "amount" : 100},
  {"time" : "32", "amount" : 320},
  {"time" : "34", "amount" : 250},
  {"time" : "36", "amount" : 300},
  {"time" : "38", "amount" : 220},
  {"time" : "40", "amount" : 400},
  {"time" : "42", "amount" : 100},
  {"time" : "44", "amount" : 500},
  {"time" : "46", "amount" : 200},
  {"time" : "48", "amount" : 400},
  {"time" : "50", "amount" : 300},
  {"time" : "52", "amount" : 250},
  {"time" : "54", "amount" : 320},
  {"time" : "56", "amount" : 150},
  {"time" : "58", "amount" : 400},
  {"time" : "60", "amount" : 200},
  {"time" : "62", "amount" : 50},
  {"time" : "64", "amount" : 60},
  {"time" : "66", "amount" : 30},
  {"time" : "68", "amount" : 170},
  {"time" : "70", "amount" : 100},
  {"time" : "72", "amount" : 320},
  {"time" : "74", "amount" : 250},
  {"time" : "76", "amount" : 300},
  {"time" : "78", "amount" : 220},
  {"time" : "80", "amount" : 400},
  {"time" : "82", "amount" : 100},
  {"time" : "84", "amount" : 500},
  {"time" : "86", "amount" : 200},
  {"time" : "88", "amount" : 400},
  {"time" : "90", "amount" : 300},
  {"time" : "92", "amount" : 250},
  {"time" : "94", "amount" : 320},
  {"time" : "96", "amount" : 150},
  {"time" : "98", "amount" : 400},
  {"time" : "100", "amount" : 200},
  {"time" : "102", "amount" : 50},
  {"time" : "104", "amount" : 60},
  {"time" : "106", "amount" : 30},
  {"time" : "108", "amount" : 170},
  {"time" : "110", "amount" : 100},
  {"time" : "112", "amount" : 320},
  {"time" : "114", "amount" : 250},
  {"time" : "116", "amount" : 300},
  {"time" : "118", "amount" : 220},
  {"time" : "120", "amount" : 400},
  {"time" : "122", "amount" : 100},
  {"time" : "124", "amount" : 500},
  {"time" : "126", "amount" : 200},
  {"time" : "128", "amount" : 400},
  {"time" : "130", "amount" : 300},
  {"time" : "132", "amount" : 250},
  {"time" : "134", "amount" : 320},
  {"time" : "136", "amount" : 150},
  {"time" : "138", "amount" : 400},
  {"time" : "140", "amount" : 200},
  {"time" : "142", "amount" : 50},
  {"time" : "144", "amount" : 60},
  {"time" : "146", "amount" : 30},
  {"time" : "148", "amount" : 170},
  {"time" : "150", "amount" : 100},
  {"time" : "152", "amount" : 320},
  {"time" : "154", "amount" : 250},
  {"time" : "156", "amount" : 300},
  {"time" : "158", "amount" : 220},
  {"time" : "160", "amount" : 400}
  ]
}

var xNorm = 100;
var yNorm = 600;
var graphWidth = 1200;
var graphSpacer = 50;
var itemWidth = 50;
var prevDataX = 0;
var curHeight = yNorm;
var coordinateStore = [];
var graphDivX = (graphWidth)/50;
var graphDivY = (yNorm - xNorm)/50;
var graphXLabels = (yNorm - xNorm)/100;
var xCenter = 100;
var yCenter = 100;
// counter var
var counter = 0;
var speed = 0.4;

var xZero = xNorm + xCenter;
var yZero = yNorm + yCenter;

for(var i=0; i<dataSet.people.length; i++) {
  thisData = dataSet.people[i];
  thisData["timeOffset"] = thisData.time;
  if (i == 0) {
    thisData["x"] = xZero - 10;
  } else {
    thisData["x"] = xZero - 10 - 48;
  }
  thisData["y"] = yZero - thisData.amount;
  thisData["rad"] = 5;
  thisData["live"] = false;

  coordinateStore.push([thisData["x"],thisData["y"]]);
}

// draw axis
c.save();
c.translate(xCenter,yCenter);
drawAxis();
c.restore();

var timer = 0;
/* **************** Start Draw Function (runtime) ********************* */
function draw() {
/* **************** Start Draw Function (runtime) ********************* */

/* **************** Draw Function Housekeeping ************** */
// frame rate
  frameRate = 60;

// reset global composition mode

// Each frame reset color overlay mode
  lc.globalCompositeOperation = 'source-over';


lc.clearRect(0,0,liveCanvas.width,liveCanvas.height);
/* **************** Close Draw Function Housekeeping ******** */


c.clearRect(0,0,canvas.width,75);
c.textAlign = "center";
c.fillStyle = "#ccc";
c.font = "24pt arial";
c.fillText("Timer: "+timer,canvas.width/2,50);

if (counter%frameRate == 0) {
  timer+=1;
}


for(var i=0; i<dataSet.people.length; i++) {
  var d = dataSet.people[i];

  if ((!d.live) && (d.timeOffset == timer)) {
    d.live = true;
  }

  lc.strokeStyle = 'white';
  lc.lineWidth = 2;
  lc.strokeCircle(d.x,d.y,d.rad);

  if (d.live) {
    d.x += speed;
  }

  coordinateStore[i][0] = d.x;
}

var coordinateStoreLength = coordinateStore.length;

lc.beginPath();
lc.moveTo(coordinateStore[0][0],coordinateStore[0][1]);
for(var i=1; i<coordinateStoreLength; i++) {
  var coordX = coordinateStore[i][0];
  var coordY = coordinateStore[i][1];
  lc.lineTo(coordX,coordY);
}
lc.stroke();

lc.globalCompositeOperation = 'destination-in';
lc.fillStyle = rgba(255,0,0,1);
lc.fillRect(xNorm+xCenter,yNorm+yCenter-520,graphWidth,520);


counter+=1;
/* **************** Close Draw Function (runtime) ******************** */
};
/* **************** Close Draw Function (runtime) ******************** */

