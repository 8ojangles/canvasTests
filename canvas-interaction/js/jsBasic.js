


/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

/* ****************  close housekeeping ********************* */


// create an object to control

var player = {
  x : canvas.width/2,
  y : canvas.height/2,
  w : 100,
  h : 100,
  colR : 150,
  colG : 150,
  colB : 150,
  xVel : 0,
  yVel : 0,
  hiLite : false,
  xOffset : 0,
  yOffset : 0,
  xCurOffset : 0,
  yCurOffset : 0,
  dragged : false
};

// shorthand variable for player
var p = player;

// create render function player 
var playerRender = function() {
  c.fillStyle = rgb(p.colR,p.colG,p.colB);
  c.fillRect(p.x,p.y,p.w,p.h);
};

var playerHiLite = function() {
  if ((mouseX >= p.x)&&(mouseX <= p.x + p.w)) {
     if ((mouseY >= p.y)&&(mouseY <= p.y + p.h))
     {
      p.hiLite = true;
      p.colR = p.colG = p.colB = 255;

     } else {
      p.hiLite = false;
     }
    } else {
      p.hiLite = false;
    };
    playerNotHiLite();
};

var playerNotHiLite = function() {
  if (p.hiLite == false) {
    if (p.colR > 150) {
      p.colR -= 4;
    }
    if (p.colG > 150) {
      p.colG -= 4;
    }
    if (p.colB > 150) {
      p.colB -= 4;
    }
    // p.xOffset = 0;
    // p.yOffset = 0;
  }
};


var dragDropSwitch = function() {

  if (p.hiLite == true) {

    if (mouseDown){ 
      p.dragged = true;
      p.xCurOffset = p.xOffset;
      p.yCurOffset = p.yOffset;
    }
    if (!mouseDown){
      p.dragged = false;
      p.xOffset = mouseX - p.x;
      p.yOffset = mouseY - p.y;

      p.xVel = xVelStore;
      p.yVel = yVelStore;

    }

  }

};

var dragDrop = function() {
  if (p.dragged == true) {
    p.x = mouseX - p.xCurOffset;
    p.y = mouseY - p.yCurOffset;
  }
};

var boundaryWrap = function() {
  if (p.x > canvas.width) {
    p.x = 0 - p.w;
  }

  if ((p.x < 0 - p.w)&&(p.xVel < 0)) {
    p.x = canvas.width;
  }

  if (p.y > canvas.height) {
    p.y = 0 - p.h;
  }

  if ((p.y < 0 - p.h)&&(p.yVel < 0)) {
    p.y = canvas.height;
  }
};

var prevX = 0;
var prevY = 0;
var xVelStore = 0;
var yVelStore = 0;

var playerUpdate = function() {

  prevX = p.x;
  prevY = p.y;
  playerHiLite();
  dragDropSwitch();
  dragDrop();
  boundaryWrap();



  p.x += p.xVel;
  p.y += p.yVel;
  xVelStore = p.x - prevX;
  yVelStore = p.y - prevY;

};

// key switches

var playerUpKey = false;
var playerDownKey = false;
var playerLeftKey = false;
var playerRightKey = false;

// key bindings

// up key

$(document).bind('keydown', 'w', function(){
  playerUpKey = true;
});

$(document).bind('keyup', 'w', function(){
  playerUpKey = false;
});

// down key

$(document).bind('keydown', 's', function(){
  playerDownKey = true;
});

$(document).bind('keyup', 's', function(){
  playerDownKey = false;
});

// left key

$(document).bind('keydown', 'a', function(){
  playerLeftKey = true;
});

$(document).bind('keyup', 'a', function(){
  playerLeftKey = false;
});

// right key

$(document).bind('keydown', 'd', function(){
  playerRightKey = true;
});

$(document).bind('keyup', 'd', function(){
  playerRightKey = false;
});

function keyFunctionRuntime() {

  // Key Functions - Player

// Up Key Function
  if ((playerUpKey) && (p.yVel > -10)) {
    p.yVel-=0.5;
  }
// Up Key Off Function
  if ((!playerUpKey)&&(p.yVel < 0)) {
    p.yVel+=0.125;
    }

// Down Key Function
  if ((playerDownKey) && (p.yVel < 10)) {
    p.yVel+=0.5;
  }
// Down Key Off Function
  if ((!playerDownKey) && (p.yVel > 0)) {
    p.yVel-=0.125;
  }

// left Key Function
  if ((playerLeftKey) && (p.xVel > -10)) {
    p.xVel-=0.5;
  }
// left Key Off Function
  if ((!playerLeftKey) && (p.xVel < 0)) {
    p.xVel+=0.125;
  }

// right Key Function
  if ((playerRightKey) && (p.xVel < 10)) {
    p.xVel+=0.5;
  }
// right Key Off Function
  if ((!playerRightKey) && (p.xVel > 0)) {
    p.xVel-=0.125;
  }

}



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

/* **************** create shapes ********************* */


playerRender();
playerUpdate();
keyFunctionRuntime();

/* **************** basic canvas interaction - keyboard ********************* */



// debug output

  c.font = "20pt arial";
  c.fillStyle = "#ccc";
  c.fillText("p.hiLite "+p.hiLite,canvas.width-400,100);
  c.fillText("p.xOffset "+p.xOffset,canvas.width-400,130);
  c.fillText("p.yOffset "+p.yOffset,canvas.width-400,160);
  c.fillText("p.x "+p.x,canvas.width-400,190);
  c.fillText("p.y "+p.y,canvas.width-400,220);
  c.fillText("mouseX "+mouseX,canvas.width-400,250);
  c.fillText("mouseY "+mouseY,canvas.width-400,280);
  c.fillText("p.xVel "+p.xVel,canvas.width-400,310);
  c.fillText("p.yVel "+p.yVel,canvas.width-400,340);



/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */


