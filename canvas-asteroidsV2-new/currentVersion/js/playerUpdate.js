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

  for(var i=0; i < particles.length; i++) {
    var par = particles[i];
    var thisTypeC = par.type;

    switch(thisTypeC) {

      case "asteroidsL" :

    var thisDist = dist(p.x, p.y, par.x, par.y);
    var minDist = p.size + par.size;

      if (thisDist <= minDist) {
          colPointX = p.x;
          colPointY = p.y;
          p.x = null;
          p.y = null;
          thisTime = counter;
          playerCollision = true;
          playerLives-=1;
          playerAlive = false;
          par.particleAlive = false;
          par.particleRender = false;
          createAsteroidsS();
          createExplosion();
        }
        break;

        case "asteroidsS" :
        var thisDist = dist(p.x, p.y, par.x, par.y);
        var minDist = p.size + par.size;

        if (thisDist <= minDist) {
          colPointX = p.x;
          colPointY = p.y;
          p.x = null;
          p.y = null;
          thisTime = counter;
          playerCollision = true;
          playerLives-=1;
          playerAlive = false;
          par.particleAlive = false;
          par.particleRender = false;
          createExplosion();
        }
        break;
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
      $('.canvasBox').removeClass('start').addClass('notStart');
      gameOver = true;
      startGame = false;
    }

};