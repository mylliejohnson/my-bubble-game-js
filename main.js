/* ---- GAME SETUP ----- */
let bgMusic = document.getElementById("bgmusic");
let icon = document.getElementById("icon");
document.getElementById("bgmusic").volume = 0.7;
let dart = new Image();
dart.src = "./images/dart1.png";
let dartDown = new Image();
dartDown.src = "./images/dartdown.png";
let audioPopSound = new Audio("./audio/Bubble, pop sound effect.mp3");
let audioLoveBubbs = new Audio(
  "./audio/mixkit-extra-bonus-in-a-video-game-2045.wav"
);

//Review Animation
// anime
//   .timeline({ loop: true })
//   .add({
//     targets: ".ml15 .word",
//     scale: [14, 1],
//     opacity: [0, 1],
//     easing: "easeOutCirc",
//     duration: 800,
//     delay: (el, i) => 800 * i,
//   })
//   .add({
//     targets: ".ml15",
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000,
//   });

canvas.width = 800;
canvas.height = 500;

// audio
icon.onclick = function () {
  if (bgMusic.paused) {
    bgMusic.play();
    icon.src = "./images/pause.png";
  } else {
    bgMusic.pause();
    icon.src = "./images/play.png";
  }
};

/* ---------------------- 
       Classes     
 ---------------------- */

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
    this.x -= 6;
    this.draw();
  };
}

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
    this.y += 6;
    this.draw();
  };
}

/* -----------------------------
  CREATE PINS AND SET INTERVALS
-------------------------------*/
let pinPops = [];
let verticalPins = [];
let speed = 2000;
let int1 = null;
let int2 = null;

setInterval(() => {
  let newSpeed = speed - 500;
  speed = Math.max(1000, newSpeed);
  console.log(speed);
  clearInterval(int1);
  clearInterval(int2);
  setTime();
}, 10000);

function setTime() {
  console.log(speed);
  int1 = setInterval(() => {
    let pinsDown = new downPin(Math.max(Math.random() * 800), 0, 25, 50);
    verticalPins.push(pinsDown);
  }, speed);

  int2 = setInterval(() => {
    let pins = new Pin(canvas.width, Math.random() * 360, 10, 10, 25);
    pinPops.push(pins);
  }, speed);
}
setTime();

/* ------------ 
      LIVES
--------------- */
let lives = ["X", "X", "X"];
function displayLives() {
  let i = 0;
  for (let life of lives) {
    i += 40;
    ctx.fillText(life, canvas.width - 175 + i, canvas.height - 25);
  }
}

/* ----------------------
    KEY FUNCTIONS 
------------------------- */
window.onkeydown = function (e) {
  if (e.key === "ArrowRight") {
    bubb.x += 19;
    if (bubb.x > canvas.width) {
      bubb.x = canvas.width - bubb.r;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowLeft") {
    bubb.x -= 19;
    if (bubb.x + bubb.r < 0) {
      bubb.x = -bubb.x + bubb.r;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowUp") {
    bubb.y -= 19;
    if (bubb.y + bubb.r < 0) {
      bubb.y = -bubb.y + bubb.r;
      console.log("Out of bounds");
    }
  }
  if (e.key === "ArrowDown") {
    bubb.y += 19;
    if (bubb.y > canvas.height) {
      bubb.y = canvas.height - bubb.r;
      console.log("Out of bounds");
    }
  }
};

/* --------------------
        BUBBLES
----------------------- */
let score = 0;
let bubb = new Bubble(canvas.width / 2, canvas.height / 2, 30, 0, 1 * Math.PI);

function pop(bubble) {
  for (var a = 0; a < bubble.lines.length; a++) {
    popDistance = bubble.radius * 0.5;
    bubble.lines[a].popping = true;
    bubble.popping = true;
  }
}

/* -----------------------
       ANIMATE !!!
 ----------------------- */

let animateId = null;
let bubbsdropping = false;
function animate() {
  animateId = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ----- DRAW & DISPLAY ----- //
  drawBubbles();
  bubb.draw();
  if (lives.length <= 2 && !bubbsdropping) {
    startDropBubbs();
    bubbsdropping = true;
  }

  displayLives(lives);

  if (!bubb.gameover) {
    ctx.fillText(score, 20, 50);
  }

  bubb.r = Math.max(10, bubb.r - 0.02);

  // ---- COLLISIONS ----- //
  for (let pins of pinPops) {
    pins.move();
    if (circleRect(bubb.x, bubb.y, bubb.r, pins.x, pins.y, pins.w, pins.h)) {
      console.log("collision");
      audioPopSound.play();
      pinPops = [];
      verticalPins = [];
      bubb.r = 10;
      lives.pop();
    }

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
      audioPopSound.play();
      pinPops = [];
      verticalPins = [];
      bubb.r = 10;
      lives.pop();
    }

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

  // -------- EXTRA LIVES -------- //

  for (let chats of verticalBubbs) {
    chats.move();
    if (
      circleRect(bubb.x, bubb.y, bubb.r, chats.x, chats.y, chats.w, chats.h)
    ) {
      console.log("bonus score");
      audioLoveBubbs.play();
      verticalBubbs = [];
      if (lives.length <= 2) {
        lives.push("X");
      }
    }
  }

  // ------ GAMEOVER ----- //
  if (lives.length == 0) {
    bubb.gameover = true;
    ctx.textAlign = "center";
    ctx.fillText(score, canvas.width - 400, canvas.height - 300);
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    //document.getElementById("input-form").value;

    ctx.font = "28px Teko, san-serif";

    ctx.fillText(
      "Press the SPACEBAR to start a new game",
      canvas.width / 2,
      canvas.height / 2 + 50
    );

    ctx.font = "48px Teko, san-serif";

    //Review Animation
    // anime
    // .timeline({ loop: true })
    // .add({
    //   targets: ".ml15 .word",
    //   scale: [14, 1],
    //   opacity: [0, 1],
    //   easing: "easeOutCirc",
    //   duration: 800,
    //   delay: (el, i) => 800 * i,
    // })
    // .add({
    //   targets: ".ml15",
    //   opacity: 0,
    //   duration: 1000,
    //   easing: "easeOutExpo",
    //   delay: 1000,
    // });
  }

  // --- SCORE KEEPING --- //
  finalScore = score;

  if (bubb.gameover && !scoreSave) {
    highscore({ finalScore });
    scoreSave = true;
  }
} //end of animate function

let finalScore = null;
let scoreSave = false;

// --- GAME RESET --- //
window.onkeypress = function (e) {
  if (e.key === " " && bubb.gameover) {
    window.location.reload();
  }
};
ctx.font = "48px Teko, san-serif";

animate();
