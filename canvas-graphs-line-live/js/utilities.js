var drawAxis = function() {
  c.lineWidth = 1;

  for (var i = 0; i<=graphDivX; i++) {
    if (i%2 == 0) {
      c.strokeStyle = '#555';
    } else {
      c.strokeStyle = '#222';
    }
    c.beginPath();
    c.moveTo(xNorm+(50*i), yNorm+50);
    c.lineTo(xNorm+(50*i), xNorm);
    c.stroke();
  };

  for (var i = 0; i<=graphDivY; i++) {
    if (i%2 == 0) {
      c.strokeStyle = '#555';
    } else {
      c.strokeStyle = '#222';
    }
    c.beginPath();
    c.moveTo(xNorm-50, yNorm-(50*i));
    c.lineTo(xNorm+graphWidth, yNorm-(50*i));
    c.stroke();
  };

  c.textAlign = "center";
  c.fillStyle = "#ccc";
  c.font = "16pt arial";
// create graph labels
  for (var i = 0; i<=graphWidth; i+=100) {
    c.fillText(i/10,xNorm+i,yNorm+50);
  };
  for (var i = 0; i<=graphXLabels; i++) {
    c.fillText(i*100,xNorm-50,yNorm-(i*100));
  };
// create axis titles
c.fillText("Time Past (seconds)",(graphWidth/2)+xNorm,yNorm+100);

var thisRotate = radians(-90);

c.save();
c.translate(0,yNorm/2);
c.rotate(thisRotate);
c.font = "18pt arial";
c.fillText("Amount",0,0);
c.restore();

  // create graph axis
  c.strokeStyle = 'white';
  c.lineWidth = 4;
  c.beginPath();
  c.moveTo(xNorm, xNorm);
  c.lineTo(xNorm, yNorm);
  c.lineTo(xNorm+graphWidth, yNorm);
  c.stroke();
};