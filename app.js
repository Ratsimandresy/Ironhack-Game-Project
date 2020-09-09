let countdown = document.querySelector(".countDown");
let button = document.getElementById("btn");
let startMin = 5;
let time = startMin * 60;

let start = () => {
  setInterval(countDown, 1000);
};
function countDown() {
  const min = Math.floor(time / 60);
  let sec = time % 60;

  sec = sec < 10 ? "0" + sec : sec;

  countdown.textContent = `0${min} : ${sec}`;
  time--;
}

button.onclick = start;

let score = document.querySelector("#score p span");
console.log(score);

let point = 0;

//* --------------------------------------------------------------------------------------------------------
const scale = 8;
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

//* --------------------------------------------------------------------------------------------------------

let canvas = document.getElementById("gameContainer");
let ctx = canvas.getContext("2d");
let keyPresses = {};
let currentDirection = up;
let currentLoopIndex = 0;
let frameCount = 0;
let pX = 400;
let pY = 300;
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
ceriseImg.src = "/cerise.gif";
let cerise = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};

const orangeImg = new Image();
orangeImg.src = "/orange.gif";
let orange = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};

const berryImg = new Image();
berryImg.src = "/berry.png";
let berry = {
  x: Math.floor(Math.random() * canvas.width),
  y: Math.floor(Math.random() * canvas.height),
};
const fraiseImg = new Image();
fraiseImg.src = "/fraise.gif";
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
    //* collision detection

    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}

let ball1 = new Ball(190, 350, 70, "brown", 4);

//* collision detcetion ball & player

function maxVal(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

let closestX = maxVal(ball1.x, pX, pX + sWidth);
let closestY = maxVal(ball1.y, pY, pY + sHeight);

let distX = ball1.x - closestX;
let distY = ball1.y - closestY;

function checkingIntersect() {
  let distSqaured = Math.pow(distX, 2) + Math.pow(distY, 2);
  return distSqaured < Math.pow(ball1.radius, 2);
}

function isColliding() {
  let circleDist = {
    x: Math.abs(ball1.x - pX),
    y: Math.abs(ball1.y - pY),
  };

  if (circleDist.x > sWidth / 2 + ball1.radius) {
    point -= 2;
    score.textContent = `${point}`;
    return false;
  }
  if (circleDist.y > sHeight / 2 + ball1.radius) {
    point -= 2;
    score.textContent = `${point}`;
    return false;
  }
  if (circleDist.x < sWidth / 2) {
    point -= 2;
    score.textContent = `${point}`;
    return true;
  }
  if (circleDist.y < sHeight / 2) {
    point -= 2;
    score.textContent = `${point}`;
    return true;
  }

  let cornerDistSqred =
    Math.sqrt(circleDist.x - sWidth / 2) + Math.sqrt(circleDist - sHeight / 2);
  return cornerDistSqred <= Math.sqrt(ball1.radius);
}
// isColliding();

//* make player --------------------------------------------------------------------------------------------------------

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
    point += 3;
    score.textContent = `${point}`;
  }

}
    // function loosePoint() {
    //   if (pX < ball1.x + ball1.radius && pX > ball1 && ) {
        
    //   }
    // }
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
  checkingIntersect();
  // isColliding();
  drawFood();
  eatFood();

  drawFrame(loopCycle[currentLoopIndex], currentDirection, pX, pY);
  ball1.draw();
  ball1.update();
  window.requestAnimationFrame(gameLoop);
}
gameLoop();
