// canvas setup
// const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");

//declaring background music to play and pause
//let introMusic = new Audio("./audio/Adventure-320bit.mp3");
let bgMusic = document.getElementById("bgmusic");
let icon = document.getElementById("icon");
//setting background music volume to 0.7 so we can hear pop sound loud and clear
document.getElementById("bgmusic").volume = 0.7;

icon.onclick = function () {
  // bgMusic.play();
  if (bgMusic.paused) {
    bgMusic.play();
    icon.src = "./images/pause.png";
  } else {
    bgMusic.pause();
    icon.src = "./images/play.png";
  }
};

// create bubble
class Bubble {
  constructor(x, y, r, sAngle, eAngle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.sAngle = sAngle;
    this.eAngle = eAngle;
    this.gameover = false;
  }

  draw = () => {
    if (!this.gameover) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#A9D0F5";
      ctx.fill();
    }
  };
}

// the bubble
let bubb = new Bubble(canvas.width / 2, canvas.height / 2, 30, 0, 1 * Math.PI);

// key functions - move and grow bubble // track score
window.onkeydown = function (e) {
  if (e.key === "ArrowRight") {
    bubb.x += 19; // increase speed bubble moves across bored
    if (bubb.x > canvas.width) {
      bubb.x = canvas.width - bubb.r;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowLeft") {
    bubb.x -= 19; // increase speed bubble moves across bored
    if (bubb.x + bubb.r < 0) {
      bubb.x = -bubb.x + bubb.r;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowUp") {
    bubb.y -= 19; // increase speed bubble moves across bored
    if (bubb.y + bubb.r < 0) {
      bubb.y = -bubb.y + bubb.r;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowDown") {
    bubb.y += 19; // increase speed bubble moves across bored
    if (bubb.y > canvas.height) {
      bubb.y = +bubb.y - bubb.r;
      console.log("Out of bounds");
    }
  }
};

let score = 0;

let dart = new Image();
dart.src = "./images/dart1.png";

// create pins
class Pin {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw = () => {
    ctx.drawImage(dart, this.x, this.y, 50, 25);
  };

  move = () => {
    this.x -= 6; // slow pins down, maybe increase as level gets harder?
    this.draw();
  };

  clear = () => {
    ctx.clearRect(this.x, this.y, 50, 25);
    console.log("clear across");
  };
}

let dartDown = new Image();
dartDown.src = "./images/dartdown.png";

class downPin {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw = () => {
    ctx.drawImage(dartDown, this.x, this.y, 25, 50);
  };

  move = () => {
    this.y += 6; // slow pins down, maybe increase as level gets harder?
    this.draw();
  };

  clear = () => {
    ctx.clearRect(this.x, this.y, 25, 50);
    console.log("clear down");
  };
}

// interval for pins

let verticalPins = [];

setInterval(() => {
  let pinsDown = new downPin(Math.max(Math.random() * 800), 0, 25, 50);
  verticalPins.push(pinsDown);
}, 2000);

let pinPops = [];

setInterval(() => {
  let pins = new Pin(canvas.width, 40 + Math.random() * 360, 10, 10, 25);
  pinPops.push(pins);
}, 2000);

// ---------- lives ----------
let lives = ["X", "X", "X"];
function displayLives() {
  let i = 0;
  for (let life of lives) {
    i += 40;
    ctx.fillText(life, canvas.width - 175 + i, canvas.height - 25);
  }

  if (lives.length == 0) {
    cancelAnimationFrame(animateId);
    console.log("game over");
    bgMusic.pause(); //background music stops when all lives are finished
  }
}

// -----------------------
//       animate it!
// -----------------------

let animateId = null;

let audioPopSound = new Audio("./audio/Bubble, pop sound effect.mp3");
let audioLoveBubbs = new Audio(
  "./audio/mixkit-extra-bonus-in-a-video-game-2045.wav"
);

function pop(bubble) {
  for (var a = 0; a < bubble.lines.length; a++) {
    popDistance = bubble.radius * 0.5;
    bubble.lines[a].popping = true;
    bubble.popping = true;
  }
}

// -----------------------
//       animate it!
// -----------------------

function animate() {
  animateId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBubbles();
  bubb.draw();

  bubb.r = Math.max(10, bubb.r - 0.02);

  if (!bubb.gameover) {
    ctx.fillText(score, 20, 50);
  }

  // when collision is detected, pop a life off of the array
  displayLives(lives);

  // detect collision horizontal pins
  for (let pins of pinPops) {
    pins.move();

    if (circleRect(bubb.x, bubb.y, bubb.r, pins.x, pins.y, pins.w, pins.h)) {
      console.log("collision");
      // cancelAnimationFrame(animateId);
      // bgMusic.pause();
      audioPopSound.play();
      // pins.clear();
      pinPops = [];
      verticalPins = [];
      bubb.r = 10;
      lives.pop();
    }

    //Bubble pins
    for (let bubble of bubbles) {
      if (
        circleRect(
          bubble.position.x,
          bubble.position.y,
          bubble.radius,
          pins.x,
          pins.y,
          pins.w,
          pins.h
        )
      ) {
        pop(bubble);
      }
      if (
        collisionCircle(
          bubble.position.x,
          bubble.position.y,
          bubble.radius,
          bubb.x,
          bubb.y,
          bubb.r
        )
      ) {
        bubb.r += 0.02;
      }
    }
  }

  // detect collision vertical pins
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
      // cancelAnimationFrame(animateId);
      // bgMusic.pause();
      audioPopSound.play();
      pinPops = [];
      verticalPins = [];
      bubb.r = 10;
      lives.pop();
    }

    //Bubble pins
    for (let bubble of bubbles) {
      if (
        circleRect(
          bubble.position.x,
          bubble.position.y,
          bubble.radius,
          pinsDown.x,
          pinsDown.y,
          pinsDown.w,
          pinsDown.h
        )
      ) {
        pop(bubble);
      }
      if (
        collisionCircle(
          bubble.position.x,
          bubble.position.y,
          bubble.radius,
          bubb.x,
          bubb.y,
          bubb.r
        )
      ) {
        if (!bubb.gameover) {
          score += 1;
          bubb.r += 0.01;
        }
        pop(bubble);
      }
    }
  }

  //Bonus love bubbles
  if (lives.length <= 2) {
    for (let chats of verticalBubbs) {
      chats.move();
      if (
        circleRect(bubb.x, bubb.y, bubb.r, chats.x, chats.y, chats.w, chats.h)
      ) {
        console.log("bonus score");
        audioLoveBubbs.play();
        verticalBubbs = [];
        lives.push("X");
        // pinsDown.clear();
      }
    }
  }

  if (lives.length == 0) {
    bubb.gameover = true;
    ctx.fillText(Math.max(score), canvas.width - 400, canvas.height - 300);
    let gameover = ctx.fillText(
      "GAME OVER",
      canvas.width / 2 - 100,
      canvas.height / 2
    );
    ctx.font = "28px Teko, san-serif";

    ctx.fillText(
      "Press the SPACEBAR to start a new game",
      canvas.width / 2 - 210,
      canvas.height / 2 + 50
    );
    ctx.font = "48px Teko, san-serif";
  }
}

ctx.font = "48px Teko, san-serif";

animate();
window.onkeypress = function (e) {
  if (e.key === " " && bubb.gameover) {
    window.location.reload();
  }
};
