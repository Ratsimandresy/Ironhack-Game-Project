let score = document.querySelector("#score p span");
console.log(score);

let point = 0;

let ms = 0;
let s = 0;
let m = 0;
let timer;

let stopwatch = document.querySelector(".countDown");
let button = document.getElementById("btn");

let start = () => {
  if (!timer) {
    timer = setInterval(run, 10);
  }
  button.textContent = "GO";
};

function run() {
  stopwatch.textContent =
    (m < 10 ? "0" + m : m) +
    ":" +
    (s < 10 ? "0" + s : s) +
    ":" +
    (ms < 10 ? "0" + ms : ms);
  ms++;
  if (ms === 100) {
    ms = 0;
    s++;
  }
  if (s === 60) {
    s = 0;
    m++;
  }
}
button.onclick = start;

//* --------------------------------------------------------------------------------------------------------
const scale = 7;
const width = 16;
const height = 18;
const sWidth = scale * width;
const sHeight = scale * height;
const loopCycle = [0, 1, 0, 2];
const down = 0;
const up = 1;
const left = 2;
const right = 3;
const framLim = 12;
var randomNumber;
let speed = 3.3;
let eatFruit = new Audio();
let upAudio = new Audio();
let downAudio = new Audio();
let leftAudio = new Audio();
let rightAudio = new Audio();

//* --------------------------------------------------------------------------------------------------------
eatFruit.src = "./audio/eat.mp3";
upAudio.src = "./audio/up.mp3";
downAudio.src = "./audio/down.mp3";
leftAudio.src = "./audio/left.mp3";
rightAudio.src = "./audio/right.mp3";

let sound = document.getElementById("sound");

function play() {
  sound.volume = 0.02;
  sound.play();
}
function upSound() {
  upAudio.volume = 0.3;
  upAudio.play();
}
function downSound() {
  downAudio.volume = 0.3
  downAudio.play();
}
function leftSound() {
  leftAudio.volume = 0.3
  leftAudio.play();
}
function rightSound() {
  rightAudio.volume = 0.3
  rightAudio.play();
}
function playEat() {
  eatFruit.volume = 0.3;
  eatFruit.play();
}

//* --------------------------------------------------------------------------------------------------------
let lives = document.getElementById("lifePoint");
console.log(lives);

//* --------------------------------------------------------------------------------------------------------let canvas = document.getElementById("gameContainer");

let canvas = document.getElementById("gameContainer");
let ctx = canvas.getContext("2d");
let keyPresses = {};
let currentDirection = up;
let currentLoopIndex = 0;
let frameCount = 0;
let pX = 500;
let pY = 700;
let img = new Image();
let moving = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawFood() {
  ctx.drawImage(ceriseImg, cerise.x, cerise.y);
  ctx.drawImage(orangeImg, orange.x, orange.y);
  ctx.drawImage(berryImg, berry.x, berry.y);
  ctx.drawImage(fraiseImg, fraise.x, fraise.y);
}

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  keyPresses[event.key] = true;
  // console.log(event.key, keyPresses[event.key] )
}

window.addEventListener("keyup", keyUpListener);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

//* --------------------------------------------------------------------------------------------------------
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// let val = 200;

const ceriseImg = new Image();
ceriseImg.src = "./cerise.gif";
let cerise = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};

const orangeImg = new Image();
orangeImg.src = "./orange.gif";
let orange = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};

const berryImg = new Image();
berryImg.src = "./berry.png";
let berry = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};
const fraiseImg = new Image();
fraiseImg.src = "./fraise.gif";
let fraise = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};

//* creating balls --------------------------------------------------------------------------------------------------------

class Ball {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = -1 * this.speed;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x - this.radius < 0 || this.x >= canvas.width - this.radius) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0 || this.y >= canvas.height - this.radius) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}

let ball1 = new Ball(190, 350, 70, "blue", 4);
let ball2 = new Ball(400, 360, 70, "yellow", -2);
let ball3 = new Ball(500, 500, 70, "yellow", 3);

//* make player --------------------------------------------------------------------------------------------------------

// let D = Math.sqrt(Math.pow(pX + sWidth, 2) + Math.pow(pY + sHeight, 2));

// let player = new Ball(pX + sWidth / 2, pY + sHeight / 2, D / 2);

function playerMove(diffX, diffY, direction) {
  if (pX + sWidth + diffX > canvas.width) {
    pX -= diffX;
  }
  if (pX < 0) {
    pX = diffX;
  }

  if (pY < 0) {
    pY = diffY;
  }
  if (pY + sHeight + diffY > canvas.height) {
    pY -= diffY;
  }

  pX += diffX;
  pY += diffY;
  currentDirection = direction;
}

//* displaying score

function eatFood() {
  if (
    pX < cerise.x + 120 &&
    pX + sWidth > cerise.x &&
    pY < cerise.y + 120 &&
    pY + sHeight > cerise.y
  ) {
    cerise = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };
    playEat();
    point += 2;
    score.textContent = `${point}`;
  }

  if (
    pX < orange.x + 120 &&
    pX + sWidth > orange.x &&
    pY < orange.y + 120 &&
    pY + sHeight > orange.y
  ) {
    orange = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };
    playEat();
    point += 1;
    score.textContent = `${point}`;
  }
  if (
    pX < berry.x + 90 &&
    pX + sWidth > berry.x &&
    pY < berry.y + 90 &&
    pY + sHeight > berry.y
  ) {
    berry = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };
    playEat();
    point += 1;
    score.textContent = `${point}`;
  }
  if (
    pX < fraise.x + 90 &&
    pX + sWidth > fraise.x &&
    pY < fraise.y + 90 &&
    pY + sHeight > fraise.y
  ) {
    fraise = {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
    };
    playEat();
    point += 3;
    score.textContent = `${point}`;
  }
}

function loosingLives(ball) {
  if (
    pX < ball.x + ball.radius &&
    pX + sWidth > ball.x &&
    pY < ball.y + ball.radius &&
    pY + sHeight > ball.y
  ) {
    lives.removeChild(lives.firstChild);
  }
}

/* function isColliding() {
  if (
    pX < ball1.x + ball1.radius &&
    pX + sWidth > ball1.x &&
    pY < ball1.y + ball1.radius &&
    pY + sHeight > ball1.y
  ) {
    ball1.color = "black";
  } else {
    ball1.color = "blue";
  }

  if (
    pX < ball2.x + ball2.radius &&
    pX + sWidth > ball2.x &&
    pY < ball2.y + ball2.radius &&
    pY + sHeight > ball2.y
  ) {
    point--;
    ball2.color = "red";
  } else {
    ball2.color = "yellow";
  }

  if (
    pX < ball3.x + ball3.radius &&
    pX + sWidth > ball3.x &&
    pY < ball3.y + ball3.radius &&
    pY + sHeight > ball3.y
  ) {
    ball3.color = "red";
    point--;
  } else {
    ball3.color = "yellow";
  }
} */

function distance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

function collides(circle1, circle2) {
  var d = distance(circle1.x, circle1.y, circle2.x, circle2.y);
  return d <= circle1.radius + circle2.radius;
}

//* --------------------------------------------------------------------------------------------------------

function loadImage() {
  img.src =
    "https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png";
  img.onload = function () {
    window.requestAnimationFrame(gameLoop);
  };
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    sWidth,
    sHeight
  );
}

loadImage();

//* --------------------------------------------------------------------------------------------------------

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  if (keyPresses.ArrowUp) {
    upSound();
    playerMove(0, -speed, up);
    hasMoved = true;
  } else if (keyPresses.ArrowDown) {
    downSound();
    playerMove(0, speed, down);
    hasMoved = true;
  }

  if (keyPresses.ArrowLeft) {
    leftSound();
    playerMove(-speed, 0, left);
    hasMoved = true;
  } else if (keyPresses.ArrowRight) {
    rightSound();
    playerMove(speed, 0, right);
    hasMoved = true;
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= framLim) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= loopCycle.length) {
        currentLoopIndex = 0;
      }
    }
  }

  // "#" + parseInt(Math.random() * 0xffffff).toString(16)

  // if (collides(ball1, ball2)) {
  //   ball1.color = "black";
  // } else {
  //   ball1.color = "blue";
  // }

  drawFood();
  eatFood();
  // play();

  drawFrame(loopCycle[currentLoopIndex], currentDirection, pX, pY);
  loosingLives(ball1);
  loosingLives(ball2);
  loosingLives(ball3);
  // collisionBallPlayer(ball1);
  // isColliding();
  ball1.draw();
  ball2.draw();
  ball3.draw();
  ball3.update();
  ball2.update();
  ball1.update();
  window.requestAnimationFrame(gameLoop);
}
gameLoop();
