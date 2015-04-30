var socket; var data;

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    background(200);
    socket = io.connect('http://localhost:3000');
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
}

function draw() {
    //socket.emit('mouse', data);
}

function windowResized() {
    canvas.width = windowWidth;
    console.log(canvas.width);
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