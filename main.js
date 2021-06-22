// TO DO LIST:
// reset bubble onkeyup ------- GOT IT :)
// delete an X (life) when collision
// send in pins one at a time ----------- GOT IT :)
// give pins min and max so they're only in range of the bubble
// create vertical pins ? maybe
// DETECT COLLISION!!
// create a start intro ? maybe
// animateId = null ??

// canvas setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// create bubble
class Bubble {
  constructor(x, y, r, sAngle, eAngle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
  }

  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#A9D0F5";
    ctx.fill();
  };
}

// the bubble
let bubb = new Bubble(canvas.width / 2, canvas.height / 2, 10, 0, 1 * Math.PI);

// key functions
window.onkeydown = function (e) {
  if (e.key === " " && bubb.r < 175) {
    bubb.r++;
  }
  if (e.key === "ArrowRight") {
    bubb.x += 10;
    if (bubb.x > canvas.width - bubb.r) {
      bubb.x -= 10;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowLeft") {
    bubb.x -= 10;
    if (bubb.x < 0 + bubb.r) {
      bubb.x += 10;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowUp") {
    bubb.y -= 10;
    if (bubb.y < 0 + bubb.r) {
      bubb.y += 10;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowDown") {
    bubb.y += 10;
    if (bubb.y > canvas.height - bubb.r) {
      bubb.y -= 10;
      console.log("Out of bounds");
    }
  }
};

let score = 0;
window.onkeyup = function (e) {
  if (e.key === " ") {
    bubb.r = 10;
  }
  switch (e.key === " ") {
    case bubb.r < 50:
      score += 25;
      break;
    case bubb.r < 100:
      score += 75;
      break;
    case bubb.r < 150:
      score += 100;
      break;
    case bubb.r > 150:
      score += 200;
      break;
  }
};

let dart = new Image()
dart.src = "./images/dart1.png"

// create pins
class Pin {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw = () => {
    ctx.fillStyle = this.color;
    ctx.drawImage(dart, this.x, this.y, 100, 75);
  };

  move = () => {
    this.x -= 10;
    this.draw();
  };
}

let dartDown = new Image()
dartDown.src = "./images/dartdown.png"

class downPin {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw = () => {
    ctx.fillStyle = this.color;
    ctx.drawImage(dartDown, this.x, this.y, 100, 75);
  };

  move = () => {
    this.y += 10;
    this.draw();
  };
}

let verticalPins = [];

setInterval(() => {
  let pinsDown = new downPin(Math.max(Math.random() * 800), 0, 10, 75, "grey");
  verticalPins.push(pinsDown);
}, Math.random() * 7000);

// interval for pins
// give min and max y values to be in range with the bubble **
let pinPops = [];

setInterval(() => {
  let pins = new Pin(
    canvas.width,
    40 + Math.max(Math.random() * 400),
    75,
    10,
    "grey"
  );
  pinPops.push(pins);
}, Math.random() * 5500);

// lives
let lives = ["X", "X", "X"];
function displayLives(lives) {
  let i = 0;
  for (let life of lives) {
    i += 40;
    ctx.fillText(life, canvas.width - 175 + i, canvas.height - 25);
  }
}

// animate it!
let animateId = null;

function animate() {
  animateId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubb.draw();

  ctx.fillText(score, 20, 50);

  // when collision is detected, pop a life off of the array
  displayLives(lives);

  for (let pins of pinPops) {
    pins.move();

    if (circleRect(bubb.x, bubb.y, bubb.r, pins.x, pins.y, pins.w, pins.h)) {
      console.log("collision");
      cancelAnimationFrame(animateId);
    }
  }

  for (let pinsDown of verticalPins) {
    pinsDown.move();

    if (
      circleRect(
        bubb.x,
        bubb.y,
        bubb.r,
        pinsDown.x,
        pinsDown.y,
        pinsDown.w,
        pinsDown.h
      )
    ) {
      console.log("collision down");
      cancelAnimationFrame(animateId);
    }
  }

  let life = "X";
}

ctx.font = "48px monospace";

animate();
