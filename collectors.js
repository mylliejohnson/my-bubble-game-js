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
