/* ****************  housekeeping ********************* */

// define the canvas as a variable. define the canvas context as 2d
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

// Set Canvas full screen

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


var counter = 0;
var score = 0;
var scoreMultiplier = 1;
var multiplierTarget = 10;
var startGame = false;
var gameOver = false;
var populateAsteroids = true;
var playerAlive = true;
var playerCollision = false;
var playerLives = 3;
var powerUpTimer = 1200;
var powerUpThisTime = 0;
var powerUpTimerSet = false;
var currPowerUps = 0;
var gameTime;

// create an object to control

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

var firing = false;
var firingTime = 0;
var firingCooldown = 10;
var currBullets = 1;
var bulletSpeed = 20;
var colPointX = 0;
var colPointY = 0;
// shorthand variable for player
var p = player;

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

if (playerAlive) {
  if ((playerLeftKey)||(playerRightKey)) {
  boosterXRender();
  }
  if ((playerUpKey)||(playerDownKey)) {
  boosterYRender();
  }

  c.fillStyle = rgb(p.colR,p.colG,p.colB);
  c.fillCircle(p.x,p.y,p.r);
  c.lineWidth = 4;

  aimCalculation();

  c.strokeStyle = rgb(200,0,0);
  c.save();
  c.translate(p.x,p.y);
  c.rotate(aimAngle);
  c.beginPath()
  c.moveTo(0,0);
  c.lineTo(20,0);
  c.stroke();
  c.restore();
  }
};

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
        scoreMultiplier = 1;
        multiplierTarget = 10;
        firingCooldown = 10;
        bulletSpeed = 20;
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
        scoreMultiplier = 1;
        multiplierTarget = 10;
        firingCooldown = 10;
        bulletSpeed = 20;
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

var playerAimRender = function() {
  c.lineWidth = 1;
  c.strokeStyle = rgb(0,0,255);
  c.strokeCircle(mouseX,mouseY,20);

  c.beginPath()
  c.moveTo(mouseX,mouseY-10);
  c.lineTo(mouseX,mouseY-30);
  c.stroke();

  c.beginPath()
  c.moveTo(mouseX,mouseY+10);
  c.lineTo(mouseX,mouseY+30);
  c.stroke();

  c.beginPath()
  c.moveTo(mouseX-10,mouseY);
  c.lineTo(mouseX-30,mouseY);
  c.stroke();

  c.beginPath()
  c.moveTo(mouseX+10,mouseY);
  c.lineTo(mouseX+30,mouseY);
  c.stroke();

  

}


// create array to hold bullets(particles)
var bullets = [];

function bulletEmmisionFunct() {

  if (playerAlive) {

    if (firing) {
      if (currBullets > 0) {

        makeBullet(1);
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


function makeBullet(numBullet) {
  
  for(var i=0; i<numBullet; i++){
    var b = {
    x : p.x,
    y : p.y,
    xVel : aimXVel,
    yVel : aimYVel,
    r : 3
    }; // close var bullet
      // create particles (bullet options)  
      bullets.push(b);
  } // close for loop
} // close function makeBullet

function bulletUpdater() {

  for(var i=bullets.length-1; i>=0; i--) {
    var b = bullets[i];

    c.fillStyle = 'white';
    c.fillCircle(b.x,b.y,b.r);

    b.x += b.xVel;
    b.y += b.yVel;
    
    if ((b.x > canvas.width)||(b.x < 0)||(b.y > canvas.height)||(b.y < 0)) {
      bullets.splice(i,1);
    }
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
  c.clearRect(0,0,canvas.width,canvas.height);


if (startGame) {               

  if (populateAsteroids) {
    if (asteroidsL < 10) {
      makeAsteroidL(10);
      populateAsteroids = false;
    } else {
    makeAsteroidL(0);  
    }
  }

if (gameTime == 20) {
      if (currPowerUps < 1) {
        currPowerUps = 1;
        powerUpThisTime = counter;
      }
    }

    if ((currPowerUps == 1)&&(powerUps.length < 1)) {
      makePowerUp(1);
      currPowerUps--;
    }

/* **************** runtime function list ********************* */
playerAimRender();
asteroidLargeUpdater();
asteroidSmallUpdater();
explosionsUpdater()
bulletUpdater();
powerUpUpdater();
scoreTextUpdater();
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

function randomPopulateX() {
  var result;
  var rand1 = random(50,75);
  var rand2 = random(0,2);
  if (rand2 < 1) {
    result = 0 - rand1;
  } else {
    result = canvas.width + rand1;
  }
  return result;
};

function randomPopulateY() {
  var result;
  var rand1 = random(50,75);
  var rand2 = random(0,2);
  if (rand2 < 1) {
    result = 0 - rand1;
  } else {
    result = canvas.height + rand1;
  }
  return result;
};


// create array to hold bullets(particles)
var asteroidsL = [];
function makeAsteroidL(numAsteroidL) {
  
  for(var i=0; i<numAsteroidL; i++){
    var aL = {
    x : randomPopulateX(),
    y : randomPopulateY(),
    xVel : random(-2,2),
    yVel : random(-2,2),
    score: 100,
    r : 50
    }; // close var asteroidLarge
      // create particles (asteroidLarge options)  
      asteroidsL.push(aL);
  } // close for loop

} // close function makeAsteroidLarge

function asteroidLargeUpdater() {
// Particle 3 For Loop
  for(var i=asteroidsL.length-1; i>=0; i--) {
    var aL = asteroidsL[i];

    // c.drawImage(canvasDrawBuffer, aL.x, aL.y);
    c.fillStyle = rgb(150,150,255);
    c.fillCircle(aL.x,aL.y,aL.r);

    aL.x += aL.xVel;
    aL.y += aL.yVel;

    if (aL.x  > canvas.width + aL.r) {
    aL.x = 0 - aL.r;
    }
    if ((aL.x < 0 - aL.r)&&(aL.xVel < 0)) {
      aL.x = canvas.width+aL.r;
    }
    if (aL.y > canvas.height+aL.r) {
      aL.y = 0 - aL.r;
    }
    if ((aL.y < 0 - aL.r)&&(aL.yVel < 0)) {
      aL.y = canvas.height+aL.r;
    }

    // bullet collisions

    for(var j=bullets.length-1; j>=0; j--) {
      var bCol = bullets[j];

      var thisDist = dist(bCol.x, bCol.y, aL.x, aL.y);
      var minDist = bCol.r + aL.r;

      if (thisDist <= minDist) {
        colPointX = aL.x;
        colPointY = aL.y;
        var thisScoreText = aL.score * scoreMultiplier;
        score+=thisScoreText;
        makeScoreText(1, thisScoreText);
        makeAsteroidS(10);
        makeExplosions(1);
        bullets.splice(j,1);
        asteroidsL.splice(i,1);
        if (multiplierTarget > 0) {
          multiplierTarget--;
        }
        if (multiplierTarget == 0) {
          scoreMultiplier+=1;
          multiplierTarget = 10;
        }
      }

    }

  }
}

var asteroidsS = [];
function makeAsteroidS(numAsteroidS) {
  
  for(var i=0; i<numAsteroidS; i++){
    var aS = {
    x : colPointX,
    y : colPointY,
    xVel : random(-2,2),
    yVel : random(-2,2),
    score: 200,
    r : 10
    }; // close var asteroidSmall
      // create particles (asteroidSmall options) 
      asteroidsS.push(aS);
  } // close for loop

} // close function makeAsteroidSmall

function asteroidSmallUpdater() {
// Particle 3 For Loop
  for(var i=asteroidsS.length-1; i>=0; i--) {
    var aS = asteroidsS[i];

    c.fillStyle = rgb(150,150,255);
    c.fillCircle(aS.x,aS.y,aS.r);

    aS.x += aS.xVel;
    aS.y += aS.yVel;

    if (aS.x  > canvas.width + aS.r) {
    aS.x = 0 - aS.r;
    }
    if ((aS.x < 0 - aS.r)&&(aS.xVel < 0)) {
      aS.x = canvas.width+aS.r;
    }
    if (aS.y > canvas.height+aS.r) {
      aS.y = 0 - aS.r;
    }
    if ((aS.y < 0 - aS.r)&&(aS.yVel < 0)) {
      aS.y = canvas.height+aS.r;
    }

    // bullet collisions
    for(var j=bullets.length-1; j>=0; j--) {
      var bCol = bullets[j];

      var thisDist = dist(bCol.x, bCol.y, aS.x, aS.y);
      var minDist = bCol.r + aS.r;

      if (thisDist <= minDist) {
        colPointX = aS.x;
        colPointY = aS.y;
        makeExplosions(1);
        var thisScoreText = aS.score * scoreMultiplier;
        score+=thisScoreText;
        makeScoreText(1, thisScoreText);
        bullets.splice(j,1);
        asteroidsS.splice(i,1);
        if (multiplierTarget > 0) {
          multiplierTarget--;
        }
        if (multiplierTarget == 0) {
          scoreMultiplier+=1;
          multiplierTarget = 10;
        }
      }
    }
  }
}

var powerUps = [];

function makePowerUp(numPowers) {
  
  for(var i=0; i<numPowers; i++){
    var pu = {
    x : random(0,canvas.width),
    y : random(0,canvas.height),
    xVel : random(-2,2),
    yVel : random(-2,2),
    r : 20,
    colR : 0,
    colG : 255,
    colB : 0,
    colA : 1

    }; // close var makeExplosions
      // create particles (Score Text options)
      powerUps.push(pu);
  } // close for loop

} // close function makeScoreText

function powerUpUpdater() {

  for(var i=powerUps.length-1; i>=0; i--) {
    var pu = powerUps[i];

    c.fillStyle = rgb(pu.colR,pu.colG,pu.colB,pu.colA);
    c.fillCircle(pu.x,pu.y,pu.r);

    var thisDist = dist(p.x, p.y, pu.x, pu.y);
    var minDist = p.r + pu.r;

    pu.x += pu.xVel;
    pu.y += pu.yVel;


      if (thisDist <= minDist) {
        colPointX = pu.x;
        colPointY = pu.y;
        makeExplosions(1);
        powerUps.splice(i,1);
        if (firingCooldown == 10) {
          firingCooldown = 7;
          bulletSpeed = 25;
        }
      }

    if (pu.x  > canvas.width + pu.r) {
    pu.x = 0 - pu.r;
    }
    if ((pu.x < 0 - pu.r)&&(pu.xVel < 0)) {
      pu.x = canvas.width+pu.r;
    }
    if (pu.y > canvas.height+pu.r) {
      pu.y = 0 - pu.r;
    }
    if ((pu.y < 0 - pu.r)&&(pu.yVel < 0)) {
      pu.y = canvas.height+pu.r;
    }

  }

}

var scoreText = [];

function makeScoreText(numScores, thisScoreText) {
  
  for(var i=0; i<numScores; i++){
    var st = {
    x : colPointX,
    y : colPointY,
    thisScore : thisScoreText,
    colR : 100,
    colG : 100,
    colB : 255,
    colA : 1

    }; // close var makeExplosions
      // create particles (Score Text options)
      scoreText.push(st);
  } // close for loop

} // close function makeScoreText

function scoreTextUpdater() {
// Particle 3 For Loop
  for(var i=scoreText.length-1; i>=0; i--) {
    var st = scoreText[i];
    c.fillStyle = rgba(st.colR,st.colG,st.colB,st.colA);
    c.font = "20pt arial";
    c.fillStyle = "#ccc"; 
    c.fillText(st.thisScore, st.x,st.y);
    st.colR-=2;
    st.colG-=2;
    st.colA-=0.05;
    st.y -= 1;
    if (st.colA <= 0.05) {
      scoreText.splice(i,1);
    }

  }
}

var explosions = [];

function makeExplosions(numExplode) {
  
  for(var i=0; i<numExplode; i++){
    var ex = {
    x : colPointX,
    y : colPointY,
    colR : 255,
    colG : 255,
    colB : 255,
    colA : 1,
    line: 20,
    r : 10

    }; // close var makeExplosions
      // create particles (Explosions options)
      explosions.push(ex);
  } // close for loop

} // close function makeExplosions

function explosionsUpdater() {
// Particle 3 For Loop
  for(var i=explosions.length-1; i>=0; i--) {
    var ex = explosions[i];

    c.lineWidth = ex.line;
    c.strokeStyle = rgba(ex.colR,ex.colG,ex.colB,ex.colA);
    c.strokeCircle(ex.x,ex.y,ex.r);
    c.strokeCircle(ex.x,ex.y,ex.r*0.25);

    ex.colG-=10;
    ex.colB-=10;
    ex.colA-=0.05;
    ex.r+=25;
    ex.line-=2;
    if (ex.colA <= 0.05) {
      explosions.splice(i,1);
    }

  }
}

var bgStars = [];

function makeStars(numStars) {
  
  for(var i=0; i<numStars; i++){
    var star = {
    x : random(0,canvas.width),
    y : random(0,canvas.height),
    colR : 255,
    colG : 255,
    colB : 255,
    r : random(0.5,1)

    }; // close var makeStars
      // create particles (Stars options)
      
      bgStars.push(star);
  } // close for loop

} // close function makeStars

function starsRenderer() {

  for(var i=bgStars.length-1; i>=0; i--) {
    var star = bgStars[i];

    c.fillStyle = rgb(star.colR,star.colG,star.colB);
    c.fillCircle(star.x,star.y,star.r);

  }
}

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

var gameOverText = {
  colR : 255,
  colG : 255,
  colB : 255,
  colA : 1,
  font : "50pt arial",
  x : canvas.width/2,
  y : canvas.height/2,
  align : "center"
}

var gT = gameOverText;

var gameOverAnim = function() {
  if (gameOver) {
    startGame = false;
    c.font = gT.font;
    c.fillStyle = rgba(gT.colR,gT.colG,gT.colB,gT.colA);
    c.textAlign = gT.align;
    c.fillText("GAME OVER",gT.x,gT.y);
    c.font = "50pt arial"
    c.fillText("SCORE: "+score,gT.x,gT.y + 120);

    gT.colA -= 0.005;

    if (counter%240 == 0) {
      $('.startButton.off').removeClass('off').addClass('on');
      $('.playerControls.off').removeClass('off').addClass('on');
      initGame();
    }
  }
}

var debugOutput = function() {
  c.textAlign = "center";
  c.font = "20pt arial";
  c.fillStyle = "#ccc";
  
  c.fillText("score "+score,canvas.width/2,50);
  c.fillText("multiplier "+scoreMultiplier,canvas.width/2 - 200,50);
  c.fillText("playerLives "+playerLives,200,50);

  //c.fillText("powerUpTimerSet "+powerUpTimerSet,300,900);

  gameTime = parseInt((counter - powerUpThisTime) / 60, 10);
  c.fillText("gameTime "+gameTime ,300,canvas.height - 50);

};

