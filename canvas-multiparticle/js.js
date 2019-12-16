var canvas = document.getElementById('creativejs'),
  c = canvas.getContext('2d');

var particles = [];
var counter = 0;
var playing = false;

var thisNumber = false;

canvas.addEventListener('mousedown', mousePressed);

function mousePressed(event) {
  playing = !playing;
}

function makeParticle(numParticles, xPos, yPos, pRadius, pType) {
  var i;
  for (i = 0; i < numParticles; i++) {
    var p = {
        type : pType,
        x : xPos,
        y : yPos,
        xVel : random(-0.5, 0.5),
        yVel : random(-1, -3),
        particleAlive : true,
        particleRender : true,
    // colR : random(360),
    // colG : random(360),
    // colB : random(360),
    // colA : random(360),
        size : pRadius
      }; // close var P

      particleUseOldOrNew();
      particles.push(p);



    
  } // close for loop

} // close function makeParticle

function blueFlameRender() {
  c.fillStyle = rgb(100, 100, 255);
  c.fillCircle(p.x, p.y, p.size);
  c.fillStyle = rgb(255, 150, 0);
  c.fillCircle(p.x, p.y, p.size * 0.2);
  c.fillStyle = rgb(255, 255, 255);
  c.fillCircle(p.x, p.y, p.size * 0.1);
}

function blueFlameUpdate() {
  p.x += p.xVel;
  p.y += p.yVel;
  p.size *= 0.95;

  // while (particles.length > 60) {
  //   particles.shift();
  // } // close while
}

var particleUseOldOrNew = function() {

    for (var j = 0, len = particles.length; j < len; j++) {

        if (particles[j].particleAlive === false)
            // particles[j] = p;
         return thisNumber = j;

    }

    return null; // No dead particles found, create new

}