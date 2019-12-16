var boundaryWrap = function() {
  if (p.x  > canvas.width + p.r) {
    p.x = 0 - p.r;
  }

  if ((p.x < 0 - p.r)&&(p.xVel < 0)) {
    p.x = canvas.width;
  }

  if (p.y > canvas.height) {
    p.y = 0 - p.r;
  }

  if ((p.y < 0 - p.r)&&(p.yVel < 0)) {
    p.y = canvas.height;
  }
};

var playerUpdate = function() {

  if ((playerAlive)&&(playerLives > 0)) {

  boundaryWrap();

  p.x += p.xVel;
  p.y += p.yVel;

  // player collisions

  for(var i=asteroidsL.length-1; i>=0; i--) {
    aL = asteroidsL[i];

    var thisDist = dist(p.x, p.y, aL.x, aL.y);
    var minDist = p.r + aL.r;

      if (thisDist <= minDist) {
        colPointX = aL.x;
        colPointY = aL.y;
        p.x = null;
        p.y = null;
        thisTime = counter;
        playerCollision = true;
        playerLives-=1;
        playerAlive = false;
        asteroidsL.splice(i,1);
        makeAsteroidS(10);
        makeExplosions(1);
      }
    }
  
  for(var i=asteroidsS.length-1; i>=0; i--) {
    aS = asteroidsS[i];

    var thisDist = dist(p.x, p.y, aS.x, aS.y);
    var minDist = p.r + aS.r;

      if (thisDist <= minDist) {
        colPointX = aS.x;
        colPointY = aS.y;
        p.x = null;
        p.y = null;
        thisTime = counter;
        playerCollision = true;
        playerLives-=1;
        playerAlive = false;
        asteroidsS.splice(i,1);
        makeExplosions(1);
      }
    }
  
}
  if ((playerCollision)&&(playerLives > 0)) {
    if (counter - thisTime >= 120) {
      playerAlive = true;
      playerCollision = false;
      p.x = canvas.width/2;
      p.y = canvas.height/2;
      p.xVel = 0;
      p.yVel = 0;
    }
  }

    if (playerLives <= 0) {
    gameOver = true;
    startGame = false;
    }

};

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

  if (bgStars <= 200) {
    makeStars(200);
  } else {
    makeStars(0);
  }
  starsRenderer();

if (startGame) {

  bulletDeltaX = mouseX - p.x;
  bulletDeltaY = mouseY - p.y;
  bulletAngle = Math.atan2(bulletDeltaY,bulletDeltaX);
  bulletXVel = Math.cos(bulletAngle) * bulletSpeed;
  bulletYVel = Math.sin(bulletAngle) * bulletSpeed;

  if (populateAsteroids) {
    if (asteroidsL < 10) {
      makeAsteroidL(10);
      populateAsteroids = false;
    } else {
    makeAsteroidL(0);  
    }
  }
/* **************** runtime function list ********************* */
asteroidLargeUpdater();
asteroidSmallUpdater();
explosionsUpdater()
bulletUpdater();
bulletEmmisionFunct();
playerRender();
playerUpdate();
playerControls();

}
gameOverAnim();
/* **************** close runtime function list ********************* */

/* **************** update counter ********************* */
counter++;
/* ****************  debug output ********************* */
debugOutput();
/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */

