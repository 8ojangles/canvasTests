/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

// set Global Game vars
var counter = 0;
var score = 0;
var startGame = false;
var gameOver = false;
var populateAsteroids = true;
var playerAlive = true;
var playerCollision = false;
var playerLives = 3;

var initGame = function() {
  score = 0;
  startGame = false;
  gameOver = false;
  populateAsteroids = true;
  playerAlive = true;
  playerCollision = false;
  playerLives = 3;
  p.x = canvas.width/2;
  p.y = canvas.height/2;
  p.yVel = 0;
  p.xVel = 0;
  gT.colA = 1;
  asteroidsL.length = 0;
  asteroidsS.length = 0;
  explosions.length = 0;
  bullets.length = 0;
};

/* ****************  end housekeeping ********************* */