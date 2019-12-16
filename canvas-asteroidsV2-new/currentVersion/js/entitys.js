//Make a constructor for a particle
var Particle = function(props) {
    this.type = props.type;
    this.x = props.x;
    this.y = props.y;
    this.size = props.size;
    this.xVel = props.xVel;
    this.yVel = props.yVel;
    this.colR = props.colR;
    this.colG = props.colG;
    this.colB = props.colB;
    this.colA = props.colA;
    this.line = props.line;
    this.collType = props.collType;
};
Particle.prototype.particleAlive = true;
Particle.prototype.particleRender = true;
Particle.prototype.collisionObj = true;

// particle.collision = function(other) {
//     if (this.x === other.x) {
//         true
//     }
// };
//Global particles list
var particles = [];

//Remove all dead element from a ParticleList
particles.clean = function(){
    var p, keys;
    for (p = 0; p < this.length; p++) {
        if (!this[p].particleAlive) {
            this.splice(p, 1);
        }
    }
};

//Method for adding x amount of new particles - if num parameter isn't provided, just assume it to be 1
particles.add = function(props, num){
    //First, clean our all the garbage!
    // this.clean();

    //Now, append new particles to the end
    var n;
    for (n = 0; n < num; n++){
        particles.push( new Particle(props) );
    }
};



function createAsteroidsS() {
  for (var k = 0; k < currAsteroidLlimit; k++) {
            particles.add({ // add asteroidS
                type: "asteroidS",
                collType : "collider",
                size: 10,
                x : colPointX,
                y : colPointY,
                xVel : random(-2,2),
                yVel : random(-2,2)
              }, 1);
            }
}

function createExplosion() {
  particles.add({ // add explosion particle
              type: "explosion",
              collType : "notCollider",
              size : 10,
              line: 20,
              x : colPointX,
              y : colPointY,
              colR : 255,
              colG : 255,
              colB : 255,
              colA : 1,
              }, 1);
}

var debugOutput = function() {
  c.textAlign = "center";
  c.font = "20pt arial";
  c.fillStyle = "#ccc";
  
  c.fillText("score "+score,canvas.width/2,50);
  c.fillText("playerLives "+playerLives,200,50);
};

var gameOverText = {
  colR : 255,
  colG : 255,
  colB : 255,
  colA : 1,
  font : "100pt arial",
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