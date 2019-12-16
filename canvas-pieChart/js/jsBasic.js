


/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

/* ****************  close housekeeping ******************* */

/* ****************  create variables ********************* */
var counter = 0;

var colR = 255;
var colG = 0;
var colB = 0;

var oldAngle = 0;

var midX = canvas.width/2;
var midXL = midX;
var midY = canvas.height/2;
var midYL = midY;

var offsetX = 0;
var offsetY = 0;

var radius = canvas.height/4;
var radAdd = 0;

var timerSet = false;

var clipRegion = 0;


/* ****************  close create variables *************** */

/* ****************  create data set ********************** */

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

/* **************** close create data set ******************* */

/* **************** create data set variables *************** */

// data set variable
var dataReturned = eval(dataSet);

var totalAmount = 0;

var largestAmount = 0;
var largestName = 0;
var largestPos = 0;

for(var i=0; i<dataSet.people.length; i++) {

  dataSet.people[i]["colR"] = 255;
  dataSet.people[i]["colG"] = 0;
  dataSet.people[i]["colB"] = 0;
  dataSet.people[i]["topAmount"] = false;

  totalAmount += dataSet.people[i].amount;

  if (dataSet.people[i].amount > largestAmount) {
    largestAmount = dataSet.people[i].amount;
    largestName = dataSet.people[i].name;
    largestPos = i;
  };

};

var angle2;
/* **************** Start Draw Function ********************* */
function draw() {
/* **************** Start Draw Function ********************* */

/* **************** Draw Function Housekeeping ************** */
// frame rate
  frameRate = 60;
// Each frame reset color overlay mode
  c.globalCompositeOperation = 'source-over';

  // background
  c.fillStyle = rgb(255,255,255);
  c.fillRect(0,0,canvas.width,canvas.height);

/* **************** Close Draw Function Housekeeping ******** */

if (timerSet == true) {
} else if ((!timerSet)&&(counter == 90)) {
      timerSet = true;
}


  
  for(var i=0; i<dataSet.people.length; i++) {

    var thisData = dataSet.people[i];

    dataSet.people[i]["colG"] = i*50;
    dataSet.people[i]["colB"] = i*50;

    // c.beginPath();
    // c.arc(midX, midY, radius, 0, 2 * Math.PI);
    // c.lineTo(midX, midY);
    // c.closePath();
    // c:lineWidth = 20;
    // c.stroke();


    c.fillStyle = rgb(colR,dataSet.people[i]["colG"],dataSet.people[i]["colB"]);
        // draw wedge

    var portion = thisData.amount / totalAmount;
    var wedge = 2 * Math.PI * portion;
    var angle = oldAngle + wedge;
    console.log(angle2);
    c.beginPath();

    if (timerSet) {
      if (offsetX < 20) {
        offsetX+=0.5;
      }
      if (offsetY < 35) {
        offsetY+=0.5;
      }
    }

    if (i == largestPos) {
      midXL = midX + offsetX;
      midYL = midY + offsetY;
      c.arc(midXL, midYL, radius, oldAngle, angle);
      c.lineTo(midXL, midYL);
    } else {
      c.arc(midX, midY, radius, oldAngle, angle);
      c.lineTo(midX, midY);
    }
    
    c.closePath();
    c.fill();    // fill with wedge color
    c.lineWidth = 2;
    c.stroke();  // outline in black

    oldAngle += wedge;

  }

  c.globalCompositeOperation = 'destination-in';
  c.fillStyle = rgb(0,255,0);
  c.beginPath();
  c.arc(midX, midY, radius+100, 0, clipRegion * Math.PI);
  c.lineTo(midX, midY);
  c.closePath();
  c.fill(); 

  if (clipRegion < 2) {
  clipRegion += 0.05;
  } else {
    clipRegion = 2;
  }




counter++;

/* **************** Close Draw Function ******************** */
}
/* **************** Close Draw Function ******************** */


