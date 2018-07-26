var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");


// Ball variables
// Ball starting position
var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

// Radius of the ball
var r = 10;

// Paddle Variables
var paddleH = 10;
var paddleW = 75;
var paddleX = (canvas.width - paddleW) / 2;

var rightPressed = false;
var leftPressed = false;

// Brick variables
var brickRow = 5;
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

// Score counter
var score = 0;

// lives counter
var lives = 3;

// Button handlers
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


// FUNCTIONS 




// Function that draws the ball.
function ball() {

    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = "ghostwhite";
    context.fill();
    context.closePath();
}

// Function that draws the paddle.
function paddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
    context.fillStyle = "ghostwhite";
    context.fill();
    context.closePath();
}

// Function that draws the bricks.
function brick() {
    for(var c=0; c<brickCol; c++) {
        for(var r=0; r<brickRow; r++) {
          if(bricks[c][r].status == 1) {
            var brickX = (r*(brickW+brickPad))+brickOffsetLeft;
            var brickY = (c*(brickH+brickPad))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickW, brickH);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
          }
        }
      }
}

// Function for counting the total score

function totalScore(){
    context.font = "16px Times New Roman";
    context.fillText("Score: "+score, 8,20);
}

// Function for drawing the lives
function life() {
    context.font = "16px Arial";
    context.fillText("Lives: " + lives, canvas.width -65,20);
    
}

// Function for holding down the key
function keyDownHandler(elem) {
    if (elem.keyCode == 39) {
        rightPressed = true;
    }
    else if (elem.keyCode == 37) {
        leftPressed = true;
    }
}

// Function for letting the key go.
function keyUpHandler(elem) {
    if (elem.keyCode == 39) {
        rightPressed = false;
    }
    else if (elem.keyCode == 37) {
        leftPressed = false;
    }
}

// Function for moving the mouse
function mouseMoveHandler(elem){
    var relativeX = elem.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleW/2;
    }
}

// Function for calculating how the ball will react
// when it hits a brick
function collision() {
    for (var c = 0; c < brickCol; c++) {
        for (var r = 0; r < brickRow; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
                    dy = -dy;
                    b.status=0;
                    score++;
                    if(score == brickRow*brickCol) {
                        alert("You have won!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


// Function that draws the game
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball();
    paddle();
    totalScore();
    life();
    collision();
    brick();

    // Function that allows the ball to bounce off off walls.
    if (x + dx > canvas.width - r || x + dx < r) {
        dx = -dx;
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
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
            x = canvas.width/2;
            y = canvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleW)/2;
            }
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

    requestAnimationFrame(draw);

}



draw();


