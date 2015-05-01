var socket; var data; var pulse; var canvas;

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    background(200);
    socket = io.connect('https://gradation.herokuapp.com/');
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on('mouse', function(data) {
          // Draw a blue circle
        console.log('mouse data coming from server');
        console.log(data);
        fill(0,0,255);
        noStroke();
        ellipse(data.x,data.y,80,80);
    });
    socket.on('tweet', function(tweet) {
        console.log('tweet from', tweet.username);
        console.log('contents:', tweet.text);
    });
    socket.on('audio', function(osc) {
        console.log('audio emitted!');
    });
    
    pulse = new p5.Pulse();
    pulse.amp(0.5);
    pulse.freq(220);
    pulse.start();

}

function draw() {
    var f = map(mouseX, 0,width, 10,2000);
    pulse.freq(f);
    //console.log(pulse.getFreq());
    
    osc = {
        amp: pulse.getAmp(),
        freq: pulse.getFreq()
    };
    console.log(osc.freq);
    socket.emit('audio', osc);
}

function windowResized() {
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    //console.log(canvas.width);
}

function mouseDragged() {
    // Make a little object with mouseX and mouseY
    data = {
        x: mouseX,
        y: mouseY
    };
    console.log(data.x);
    // Send that object to the socket
    socket.emit('mouse', data);
}