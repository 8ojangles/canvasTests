var entityUpdater = function() {

for(var i=0; i<particles.length; i++) {
 
  var par = particles[i];
  var thisType = par.type; 

  switch (thisType)
    {
    case "bullet":
      c.fillStyle = 'white';
      c.fillCircle(par.x,par.y,par.size);
      par.x += par.xVel;
      par.y += par.yVel;
      if ((par.x > canvas.width)||(par.x < 0)||(par.y > canvas.height)||(par.y < 0)) {
        particles.splice(i, 1);
      }

      for(var j=0; j < particles.length; j++) {

        var parB = particles[j];
        var thisTypeB = parB.type;
        var thisColl = parB.collType;

        switch (thisColl) {
        
        case "collider": 

          var thisDist = dist(parB.x, parB.y, par.x, par.y);
          var minDist = parB.size + par.size;

          if (thisDist <= minDist) {
            colPointX = par.x;
            colPointY = par.y;
            createExplosion();
            particles.splice(i, 1);
            particles.splice(j, 1);
            if (thisTypeB == "asteroidL") {
              score+=100;
              createAsteroidsS();
            }
            if (thisTypeB == "asteroidS") {
              score+=200;
            }
          }  // close collision check

        break;

        default:
          return;

        }

      }


    break;  // close bullet case

    case "asteroidL":
      // c.drawImage(canvasDrawBuffer, aL.x, aL.y);
    c.fillStyle = rgb(150,150,255);
    c.fillCircle(par.x,par.y,par.size);

    par.x += par.xVel;
    par.y += par.yVel;

    if (par.x  > canvas.width + par.size) {
    par.x = 0 - par.size;
    }
    if ((par.x < 0 - par.size)&&(par.xVel < 0)) {
      par.x = canvas.width+par.size;
    }
    if (par.y > canvas.height+par.size) {
      par.y = 0 - par.size;
    }
    if ((par.y < 0 - par.size)&&(par.yVel < 0)) {
      par.y = canvas.height+par.size;
    }

    // bullet collisions

    break;  // close asteroidL case

    case "asteroidS":
      // c.drawImage(canvasDrawBuffer, aL.x, aL.y);
    c.fillStyle = rgb(150,150,255);
    c.fillCircle(par.x,par.y,par.size);

    par.x += par.xVel;
    par.y += par.yVel;

    if (par.x  > canvas.width + par.size) {
    par.x = 0 - par.size;
    }
    if ((par.x < 0 - par.size)&&(par.xVel < 0)) {
      par.x = canvas.width+par.size;
    }
    if (par.y > canvas.height+par.size) {
      par.y = 0 - par.size;
    }
    if ((par.y < 0 - par.size)&&(par.yVel < 0)) {
      par.y = canvas.height+par.size;
    }

    // bullet collisions

    break; // close asteroidS case

    case "explosion":
      c.lineWidth = par.line;
      c.strokeStyle = rgba(par.colR,par.colG,par.colB,par.colA);
      c.strokeCircle(colPointX,colPointY,par.size);
      c.strokeCircle(colPointX,colPointY,par.size*0.25);

      par.colG-=10;
      par.colB-=10;
      par.colA-=0.05;
      par.size+=25;
      par.line-=2;
      if (par.colA <= 0.05) {
        particles.splice(i, 1);
      }
    break; // close explosion case

    } // close main particle updater for loop switch

  } // close main particle updater for loop

} // close entityUpdater function