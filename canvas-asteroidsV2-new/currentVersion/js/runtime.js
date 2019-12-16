/* **************** Start Draw Function ********************* */
function draw() {
/* **************** Start Draw Function ********************* */

// Housekeeping

// frame rate
  frameRate = 60;

// Each frame reset color overlay mode
  c.globalCompositeOperation = 'source-over';

// clearScreen
  c.clearRect(0,0,canvas.width,canvas.height);


if (startGame) {

  if (populateAsteroids) {
    for (var k = 0; k < currAsteroidLlimit; k++) {
      particles.add({ // add bullet particle
          type: "asteroidL",
          collType : "collider",
          size: 50,
          x : random(0,canvas.width),
          y : random(0,canvas.height),
          xVel : random(-2,2),
          yVel : random(-2,2)
        }, 1);
      }
      populateAsteroids = false;
    }

/* **************** runtime function list ********************* */
playerAim();
entityUpdater();
// asteroidLargeUpdater();
// asteroidSmallUpdater();
// explosionsUpdater()
// bulletUpdater();
bulletEmmisionFunct();
playerRender();
playerUpdate();
playerControls();

}

/* **************** close runtime function list ********************* */

gameOverAnim();

/* **************** update counter ********************* */
counter++;
/* ****************  debug output ********************* */
debugOutput();
/* **************** Close Draw Function ******************** */
};
/* **************** Close Draw Function ******************** */