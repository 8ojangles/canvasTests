function draw() {
  frameRate = 60;
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = rgba(0,0,0,1);
  c.fillRect(0,0,canvas.width,canvas.height); 

  c.globalCompositeOperation = 'lighter';
  c.fillText(counter +' '+ counter%20, 20,20);
  
 if(playing) {
    makeParticle(1, 200, 200, 10, "blueFlame");
    makeParticle(1, 300, 200, 10, "redFlame");
  }

  
  
  for(var i=0; i<particles.length; i++) {
 
  var p = particles[i];
  var thisType = p.type; 
   
  switch (thisType)
	{
	case "blueFlame":
    c.fillStyle = rgb(100,100,255); 
  	c.fillCircle(p.x,p.y,p.size);
   	c.fillStyle = rgb(255,150,0);
  	c.fillCircle(p.x,p.y,p.size*0.2);
  	c.fillStyle = rgb(255,255,255);
  	c.fillCircle(p.x,p.y,p.size*0.1);

	 p.x += p.xVel;
  	p.y += p.yVel;
  	p.size*=0.9;

if (particles.size < 0.5) {
    particleAlive : false;
    particleRender : false;
  } // close while
	  break;
	case "redFlame":
	c.fillStyle = rgb(255,100,100); 
  	c.fillCircle(p.x,p.y,p.size);
   	c.fillStyle = rgb(255,150,0);
  	c.fillCircle(p.x,p.y,p.size*0.2);
  	c.fillStyle = rgb(255,255,255);
  	c.fillCircle(p.x,p.y,p.size*0.1);

	 p.x -= p.xVel;
  	p.y -= p.yVel;
  	p.size*=0.95;
if (particles.size < 0.5) {
  	particleAlive : false;
    particleRender : false;
  } // close while
	  break;
	}

c.font = "20pt arial";
  c.fillStyle = "#ccc"; 
c.fillText(particles.length, 20,20);
c.fillText(thisNumber, 20,60);

  
  } // close for
  
  counter++;
} // close draw function