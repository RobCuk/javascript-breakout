var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


// Created a square, ball and rectangle.

context.beginPath();
context.rect(20, 40, 50, 50);
context.fillStyle = "ghostwhite";
context.fill();
context.closePath();


context.beginPath();
context.rect(160, 10, 100, 40);
context.strokeStyle = "rgba(0,0,255,0.8)";
context.stroke();
context.closePath();
// Ball variables
//ball position
var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

// radius of the ball
var r = 10;

// Paddle Variables

var paddleH = 10;
var paddleW = 75;
var paddleX = (canvas.width - paddleW) / 2;

var rightPressed = false;
var leftPressed = false;

// Brick variables
var brickRow = 3;
var brickCol = 3;
var brickW = 75;
var brickH = 20;
var brickPad = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Bricks array
var bricks = [];
for (var c = 0; c < brickCol; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRow; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Button handlers

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);


// FUNCTIONS 




// Function that draws the ball.
function ball() {

    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);

    context.fill();
    context.closePath();
}

// Function that draws the paddle.
function paddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);

    context.fill();
    context.closePath();
}

// Function that draws the bricks.
function brick() {
    for (var c = 0; c < brickCol; c++) {
        for (var r = 0; r < brickRow; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickW + brickPad)) + brickOffsetLeft;
                var brickY = (c * (brickH + brickPad)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickW, brickH);
                context.strokeStyle = "red";
                context.stroke();
                context.closePath();
            }
        }
    }
}

function keyDownHandler(elem) {
    if (elem.keyCode == 39) {
        rightPressed = true;
    }
    else if (elem.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(elem) {
    if (elem.keyCode == 39) {
        rightPressed = false;
    }
    else if (elem.keyCode == 37) {
        leftPressed = false;
    }
}

function collision() {
    for (var c = 0; c < brickCol; c++) {
        for (var r = 0; r < brickRow; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
                    dy = -dy;
                    b.status=0;
                }
            }
        }
    }
}


// function that draws the game
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball();
    paddle();
    collision();
    brick();

    // Function that allows the ball to bounce off off walls.
    if (x + dx > canvas.width - r || x + dx < r) {
        dx = -dx;
        context.fillStyle = "blue";
        context.fill();
    }

    // Function that allows the ball to bounce off off the paddle 
    // otherwise making the game end.
    if (y + dy < r) {
        dy = -dy;
    } else if (y + dy > canvas.height - r) {
        if (x > paddleX && x < paddleX + paddleW) {
            dy = -dy - 1;

        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleW) {
        paddleX += 7;
    }

    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }



    x += dx;
    y += dy;

}



setInterval(draw, 10);


