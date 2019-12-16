// create the player object
var player = {
  x : canvas.width/2,
  y : canvas.height/2,
  r : 20,
  colR : 150,
  colG : 150,
  colB : 150,
  xVel : 0,
  yVel : 0
};

// shorthand variable for player
var p = player;

// create global player vars
var firing = false;
var firingTime = 0;
var firingCooldown = 10;
var currBullets = 1;
var bulletSpeed = 20;
var colPointX = 0;
var colPointY = 0;
var asteroidsL = 0;
var currAsteroidLlimit = 10;
var asteroidSlimit = 10;

var playerGraphic = function() {
  c.fillStyle = rgb(p.colR,p.colG,p.colB);
  c.fillCircle(p.x,p.y,p.r);
};

// create variables for aim to mouse function
var aimDeltaX,aimDeltaY,aimAngle,aimXVel,aimYVel;

// aim to mouse function
var aimCalculation = function() {
  aimDeltaX = mouseX - p.x;
  aimDeltaY = mouseY - p.y;
  aimAngle = Math.atan2(aimDeltaY,aimDeltaX);
  aimXVel = Math.cos(aimAngle) * bulletSpeed;
  aimYVel = Math.sin(aimAngle) * bulletSpeed;
};

// create render function player 
var playerRender = function() {

// player alive if statement
if (playerAlive) {

// booster direction if statement
  if ((playerLeftKey)||(playerRightKey)) {
  boosterXRender();
  }
  if ((playerUpKey)||(playerDownKey)) {
  boosterYRender();
  }
// player render
  playerGraphic();

// calculate aim direction
  aimCalculation();

// set gun render params
  c.lineWidth = 4;
  c.strokeStyle = rgb(200,0,0);
// render gun
  c.save();
  c.translate(p.x,p.y);
  c.rotate(aimAngle);
  c.beginPath()
  c.moveTo(0,0);
  c.lineTo(20,0);
  c.stroke();
  c.restore();

  } // end if player alive

}; // end player render function  

var boosterXRender = function() {
  var boostLength = random(50,150);
  c.globalCompositeOperation = 'lighter';
  if (playerLeftKey) {
  var boostGrad = c.createLinearGradient(p.x,p.y-10,p.x+boostLength,p.y+10);
  boostGrad.addColorStop(0,'rgba(255,255,255,1)');
  boostGrad.addColorStop(1,'rgba(0,0,255,0)');
  c.fillStyle = boostGrad;
  c.fillRect(p.x,p.y-10,boostLength,20);
  }
  if (playerRightKey) {
    var boostGrad = c.createLinearGradient(p.x,p.y-10,p.x-boostLength,p.y+10);
    boostGrad.addColorStop(0,'rgba(255,255,255,1)');
    boostGrad.addColorStop(1,'rgba(0,0,255,0)');
    c.fillStyle = boostGrad;
    c.fillRect(p.x,p.y-10,-boostLength,20);
    }
  c.globalCompositeOperation = 'source-over';
}

var boosterYRender = function() {
  var boostLength = random(50,150);
  c.globalCompositeOperation = 'lighter';
  if (playerUpKey) {
    var boostGrad = c.createLinearGradient(p.x-10,p.y,p.x+10,p.y+boostLength);
    boostGrad.addColorStop(0,'rgba(255,255,255,1)');
    boostGrad.addColorStop(1,'rgba(0,0,255,0)');
    c.fillStyle = boostGrad;
    c.fillRect(p.x-10,p.y,20,boostLength);
  }
  if (playerDownKey) {
    var boostGrad = c.createLinearGradient(p.x-10,p.y,p.x+10,p.y-boostLength);
    boostGrad.addColorStop(0,'rgba(255,255,255,1)');
    boostGrad.addColorStop(1,'rgba(0,0,255,0)');
    c.fillStyle = boostGrad;
    c.fillRect(p.x-10,p.y,20,-boostLength);
  }
  c.globalCompositeOperation = 'source-over';
}

function bulletEmmisionFunct() {

  if (playerAlive) {

    if (firing) {
      if (currBullets > 0) {

        particles.add({ // add bullet particle
          type: "bullet",
          size: 3,
          x: p.x,
          y: p.y,
          xVel : aimXVel,
          yVel : aimYVel
        }, 1);

        currBullets = 0;
      }
      if (currBullets == 0) {
        if (counter - firingTime >= firingCooldown) {
          currBullets++;
          firingTime = counter;
        }
      }
    }
    if(firing == false) { 
      firingTime = 0;
      currBullets = 1;
    }

  } // close playerAlive
  
} // close bulletEmmisionFunct

var playerAim = function() {
  c.strokeStyle= rgb(100,100,255);
  c.lineWidth = 2;
  c.strokeCircle(mouseX,mouseY,20);
}