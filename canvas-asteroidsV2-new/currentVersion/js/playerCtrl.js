// key switches

var playerUpKey = false;
var playerDownKey = false;
var playerLeftKey = false;
var playerRightKey = false;
var playerBreakKey = false;

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

$(document).bind('keydown', 'space', function(){
  playerBreakKey = true;
});

$(document).bind('keyup', 'space', function(){
  playerBreakKey = false;
});

// playerControls - runtime
function playerControls() {

// Up Key Function
  if ((playerUpKey) && (p.yVel > -5)) {
    p.yVel-=0.25;
  }
// Down Key Function
  if ((playerDownKey) && (p.yVel < 5)) {
    p.yVel+=0.25;
  }
// left Key Function
  if ((playerLeftKey) && (p.xVel > -5)) {
    p.xVel-=0.25;
  }
// right Key Function
  if ((playerRightKey) && (p.xVel < 5)) {
    p.xVel+=0.25;
  }
// space Key function
  if (playerBreakKey) {
    if (p.xVel > 0) {
      p.xVel -= 0.125;
    }
    if (p.xVel < 0) {
      p.xVel += 0.125;
    }
    if (p.yVel > 0) {
      p.yVel -= 0.125;
    }
    if (p.yVel < 0) {
      p.yVel += 0.125;
    }
  }

// mouse functions

  canvas.addEventListener('mousedown',mousePressed); 
  function mousePressed(e) {
    if (!firing) {
      firingTime = counter;
    }
    firing = true;
  }
  canvas.addEventListener('mouseup',mouseUp); 
  function mouseUp(e) {
    firingTime = 0;
    firing = false;
  }

  
} // End playerControls

// start button 

$('.startButton.on').click(function(){
  $(this).removeClass('on').addClass('off');
  $('.playerControls.on').removeClass('on').addClass('off');
  $('.canvasBox').removeClass('notStart').addClass('start');
  startGame = true;
});