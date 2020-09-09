let ms = 0;
let s = 0;
let m = 0;
let timer;

let stopwatch = document.querySelector(".stopwatch");
let button = document.getElementById("btn");

let start = () => {
  if (!timer) {
    timer = setInterval(run, 10);
  }
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

const scale = 4;
const width = 16;
const height = 18;
const sWidth = scale * width;
const sHeigth = scale * height;
const loopCycle = [0, 1, 0, 2];
const down = 0;
const up = 1;
const left = 2;
const right = 3;
const framLim = 12;
var randomNumber;
let speed = 3.1;

let canvas = document.getElementById("gameContainer");
let ctx = canvas.getContext("2d");
let keyPresses = {};
let currentDirection = up;
let currentLoopIndex = 0;
let frameCount = 0;
let pX = 400;
let pY = 200;
let img = new Image();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  pWidth: sWidth,
  pHeigth: sHeigth,
  x: pY,
  y: pY,
};
console.log(player.x);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//* creating balls
class Ball {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
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
    //* collision detection to be put here broooo

    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}

let ball1 = new Ball(190, 350, 60, "crimson", getRandom(1, 6));
let ball2 = new Ball(100, 100, 60, "green", getRandom(1, 6));
let ball3 = new Ball(200, 200, 40, "yellow", 2);

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  keyPresses[event.key] = true;
  //   console.log(keyPresses);
}

// console.log(keyDownListner())

window.addEventListener("keyup", keyUpListener);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

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
    sHeigth
  );
  ball1.draw(ctx);
  ball2.draw(ctx);
  ball3.draw(ctx);
  // ball4.draw(ctx);
}

loadImage();

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let moving = false;

function playerMove(diffX, diffY, direction) {
  //*? need to fixe something here
  if (pX + sWidth < 0 || pX + sWidth > canvas.width) {
    pX = diffX;
  }
  if (pY + sHeigth < 0 || pY + sHeigth + diffY > canvas.height) {
    pY = diffY;
  }

  pX += diffX;
  pY += diffY;
  currentDirection = direction;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // checkCollision(player, ball1)

  let hasMoved = false;

  if (keyPresses.ArrowUp) {
    playerMove(0, -speed, up);
    hasMoved = true;
  } else if (keyPresses.ArrowDown) {
    playerMove(0, speed, down);
    hasMoved = true;
  }

  if (keyPresses.ArrowLeft) {
    playerMove(-speed, 0, left);
    hasMoved = true;
  } else if (keyPresses.ArrowRight) {
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

  //*! collision detection

  // function checkCollision(player, ball) {
  //   if (
  //     player.x + player.pWidth < ball.x + ball.radius ||
  //     player.x > ball.x + ball.radius
  //     ) {
  //       alert("you loose");
  //     }
  //     if (
  //     player.y < ball.y + ball.raidus ||
  //     player.y + player.pHeigth > ball.y + ball.radius
  //   ) {
  //     alert("you loose");
  //   }
  // }

  canvas.addEventListener("mousemove", function (e) {
    if (!moving) {
      clear();
      pX = e.clientX;
      pY = e.clientY;
    }
  });

  let raf;
  canvas.addEventListener("click", function (e) {
    if (!moving) {
      raf = window.requestAnimationFrame(drawFrame);
      moving = true;
    }
  });
  canvas.addEventListener("focus", function (e) {
    raf = window.requestAnimationFrame(drawFrame);
    moving = false;
  });

  canvas.addEventListener("mouseout", function (e) {
    raf = window.cancelAnimationFrame(raf);
    moving = false;
  });
  // getRandom();

  drawFrame(loopCycle[currentLoopIndex], currentDirection, pX, pY);
  ball1.update();
  ball2.update();
  ball3.update();
  // ball4.update();
  window.requestAnimationFrame(gameLoop);
}


