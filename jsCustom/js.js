

// housekeeping
var canvas = document.getElementById('myCanvas'),
    c = canvas.getContext('2d');

    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
   


// particle array setup

var particles = [];

//counter init
var counter = 0;
var curScore = 0;
// play switch setup

var playing = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
};

resizeCanvas();  


/* **************** Draw Function ********************* */

function draw() {
// Housekeeping

// frame rate
  frameRate = 60;
// Each frame reset color overlay mode
  c.globalCompositeOperation = 'source-over';
// clearRect  
  c.fillStyle = rgba(0,0,0,1);
  c.fillRect(0,0,canvas.width,canvas.height);

// set turbulence
  var turbulance = random(-3,3);

// Each frame link play function to particle emmision (particlesPerFrame)
// playing3
  particle3EmmisionFunct();

//particle limiter
  particleLimiter();

// particle 3 updater
  particle3Updater();


var currentPx = 0;
var currentPy = 0;
var currentMx = mouseX;
var currentTop = 100;   

/* ************************ info output For loop *************************** */
 for(var i=0; i<particles.length; i++) {
  var p = particles[i];

// get current positions
  currentPx = parseInt(p.x);
  currentPy = parseInt(p.y);
  currentMx = mouseX;
  currentMy = mouseY;
  currentId = i;

// write current positions to canvas per particle
  // c.font = 'italic 24pt arial';
  // c.fillStyle = '#ccc'
  // c.fillText(currentPx+' '+currentPy+' '+currentMx + ' ' + currentId + ' ' + fPassSw, 100,currentTop);

  // c.fillText('Hit ' + curScore, 800,100);
// shift next particle info output down
  // currentTop+=30; 

// if mouse moves over particle make particle shrink
    if ( (currentPx >= (currentMx-p.size)) &&  (currentPx <= (currentMx+p.size)) && (currentPy >= (currentMy-p.size)) &&  (currentPy <= (currentMy+p.size)) ) {
    
        p.size*=0.95;
        curScore+=1;   
      }

  } // close info output for loop


  counter++;

/* **************** Close Draw Function ******************** */
}
/* **************** Close Draw Function ******************** */


function particle3EmmisionFunct() {
  if(playing) {
      if ((counter%10 == 0)&&(particles.length < 1000)){
        c.globalCompositeOperation = 'source-over';
        makeParticle(50);
      }
    }

  if(!playing) { 
    particles.length = 0;
  }
} // close $particle3EmmisionFunct


function makeParticle(numParticles) {
  
  for(var i=0; i<numParticles; i++){
    var p = {
    x : canvas.width/2,
    y : canvas.height/2,
    xVel : random(-4,4),
    yVel : random(-2,-40),
    hue : random(360),
    size : random(10,20),
    fPassSw : false,
    pKill : false
    }; // close var p
      // create particles (p options)
      
      particles.push(p);
  } // close for loop

} // close function makeParticle3


function particleLimiter() {
// Limit the number of Particles

 while (particles.length > 1000) {
 particles.shift();
  } // close while
} // end particle limiter


function particle3Updater() {
// Particle 3 For Loop
  for(var i=particles.length-1; i>=0; i--) {
  var p = particles[i];
  c.globalCompositeOperation = "lighter";
// create gradient for particle color
  var grd3 = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      grd3.addColorStop(0, 'rgba(25,255,255,0)');
      grd3.addColorStop(0.2, 'rgba(25,255,255,0)');
      grd3.addColorStop(0.8, 'rgba(25,255,255,1)');
      grd3.addColorStop(1, 'rgba(25,255,255,0)');
// create particle with gradient
      c.fillStyle = grd3;
      c.fillCircle(p.x,p.y,p.size);
//check if particle has passed right border for first time. If so change fPassSw to true
    if ((fPassSw = false) && (p.x <= (canvas.width-p.size))) {
      fPassSw = true;
    }
//if particle has passed right border (fPassSw = true) then bounce particle on right border 
    if ((fPassSw = true) && (p.x >= (canvas.width-p.size))) {
      p.x = canvas.width-p.size;
      p.xVel*=-1;
    }
//when particle hits left border reverse velocity
    if (p.x <=p.size ){
      p.x = p.size;
      p.xVel*=-1;
    } // close if  

    if (p.y >= (canvas.height-p.size)) {
      p.y = canvas.height-p.size;
      p.yVel*=-1;
    }

    if (p.y <= (0+p.size)) {
      p.yVel*=-1;
    }

// update particle position for next frame
  p.x += p.xVel;
  p.y += p.yVel;
  p.size*=1; 
   
  } // close Particle 3 For Loop
} // close particle 3 updater

/************************ Button Functions *********************************/

$('.showHide').click(function(){

  if ($('.buttonBox').hasClass('open'))
  {
    $('.showHide').html('Show');
    $('.buttonBox').removeClass('open').addClass('closed');
  } else {
    $('.showHide').html('Hide');
    $('.buttonBox').removeClass('closed').addClass('open');
  }
  preventDefault();
  return false ;
});


$('.actionBtn').click(function(){
  playing = !playing;
  if ($(this).parent().hasClass('off')) 
    {
      $(this).parent().removeClass('on off').addClass('on');
    } else if ($(this).parent().hasClass('on')) 
      {
    $(this).parent().removeClass('on off').addClass('off');
    }
    preventDefault();
  return false ;
});
