


/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

/* ****************  close housekeeping ********************* */
var imageObj = new Image();
imageObj.src = 'images/fishy.png';

/* **************** Start Draw Function ********************* */
function draw() {
/* **************** Start Draw Function ********************* */

// Housekeeping

// frame rate
  frameRate = 60;
// Each frame reset color overlay mode
  c.globalCompositeOperation = 'source-over';
// background
  c.fillStyle = rgb(0,0,0);
  c.fillRect(0,0,canvas.width,canvas.height);

/* **************** basic canvas shapes (primitives) ********************* */


// all color values can be in the formats: rgb, rgba, hsl, hsla, hex and named (i.e. white/red)

// set the shape color (specific for circles and rectagles)
  c.fillStyle = rgb(255,255,255);

// create a circle
  c.fillCircle(200,200,100);

// create a rectangle (or square)  
  c.fillRect(400,100,200,200);

// create a curve

  // set the curve/line values

  // set the color and line/stroke width (used for paths/curves/arcs)
  c.strokeStyle = 'white';
  c.lineWidth = 10;

// start the path
  c.beginPath();
// define the first point
  c.moveTo(200, 400);
// define the next point
  c.lineTo(150, 450);
// define the next point
  c.lineTo(250, 500);
// define the next point
  c.lineTo(200, 550);
// stroke the path
  c.stroke();

// begin the path
  c.beginPath();
// set the curve's first point
  c.moveTo(700, 300);
// set the curve's control points (in value pairs - x,y)
// the final value pair sets the curve's end point (x,y)
  c.bezierCurveTo(700, 50, 900, 50, 900, 300);
// draw the stroke to the curve's parameters
  c.stroke();

// create an arc
  c.lineWidth = 50;
  
// define the center point of the arc
  var x = 1100;
  var y = 200;
// define the radius of the arc
  var radius = 100;
// define the start angle of the arc ( arcs are defined using the Math.PI function. 0 equals 90 degrees. 2 also equals 90 degrees to define a complete circle )
  var startAngle = 0 * Math.PI;
// define the end angle of the arc (a full circle is 2 * PI, remembering from geometry that the circumference of a circle is computed by (2*PI) * R(adius) )
  var endAngle = 1.5 * Math.PI;
// define the rotation direction for the arc (default is clockwise)
  var counterClockwise = false;
// begin the path
  c.beginPath();
// create the arc using the variables
  c.arc(x, y, radius, startAngle, endAngle, counterClockwise);
// stroke the arc
  c.stroke();
  

// default drawing order

// object 1

  c.fillStyle = "red";
// create a circle
  c.fillCircle(1100,500,100);

  c.fillStyle = "white";
// create a circle
  c.fillCircle(1200,500,100);

  c.fillStyle = "blue";
// create a circle
  c.fillCircle(100,500,100);


//  load and display an image

// set the image parameters

  var imgX = 400;
  var imgY = 400;
  var imgWidth = 515;
  var imgHeight = 242;
// link to the image
  
  
  // store the image in a variable   

  // when the image has loaded display the image with the parameters
  // imageObj.onload = function() {
    c.drawImage(imageObj, imgX, imgY, imgWidth, imgHeight);
  // };

/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */


