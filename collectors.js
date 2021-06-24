let loveBubb = new Image();
loveBubb.src = "./images/collectibubbles.png";

class Lovebubb {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //this.image = image;
  }

  draw = () => {
    ctx.drawImage(loveBubb, this.x, this.y, 50, 50);
  };

  move = () => {
    this.y += 1;
    this.draw();
  };
}

let verticalBubbs = [];

setInterval(() => {
  let bubbsDown = new Lovebubb(Math.max(Math.random() * 700), 0, 50, 50);
  verticalBubbs.push(bubbsDown);
}, 3000);

// function collectibubbles(p1x, p1y, r1, p2x, p2y, r2) {
//   var a;
//   var x;
//   var y;

//   a = r1 + r2;
//   x = p1x - p2x;
//   y = p1y - p2y;

//   if (a > Math.sqrt((x * x) + (y * y))) {
//     return true;
//   } else {
//     return false;
//   }
// }
