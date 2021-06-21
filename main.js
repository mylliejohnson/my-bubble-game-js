// TO DO LIST:
// reset bubble onkeyup ------- GOT IT :)
// delete an X (life) when collision
// send in pins one at a time ----------- GOT IT :)
// give pins min and max so they're only in range of the bubble
// create vertical pins ? maybe
// DETECT COLLISION!!
// create a start intro ? maybe

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

class Bubble {
    constructor(x, y, r, sAngle, eAngle){
        this.x = x
        this.y = y
        this.r = r
        this.sAngle = sAngle
        this.eAngle = eAngle
    }

    draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#A9D0F5';
        ctx.fill();
    }
}

let bubb = new Bubble(canvas.width/2, canvas.height/2, 10, 0, 1*Math.PI);

window.onkeydown = function(e){
    if(e.key === " " && bubb.r < 200){
        bubb.r++
    }
}

let score = 0;
window.onkeyup = function(e){
    switch (e.key === " "){
        case bubb.r < 10:
            score += 10;
            break;
        case bubb.r < 50: 
            score += 25
            break;
        case bubb.r < 100:
            score += 75
            break;
        case bubb.r < 150:
            score += 100
            break;
        case bubb.r > 150:
            score += 200            
            break;
    }
    bubb.r = 10
}

class Pin {
     constructor(x,y,w,h,color){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.color = color
    }

    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    move = () => {
        this.x -= 25
        this.draw()
    }
}

const pinPops = []

setInterval(() => {
    let pins = new Pin(
        canvas.width, Math.max(Math.random() * 500), 75, 10, "grey");
        pinPops.push(pins)
   
}, Math.random() * 5500);

let animateId = null;

function animate(){
    animateId = requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    bubb.draw()

    ctx.fillText(score, 20, 50)
    ctx.fillText("XXX", canvas.width - 130, canvas.height - 50) // turn into array when life is lost!!!

    for(let pins of pinPops){
        pins.move();
    }

    let life = "X"
}

ctx.font = "48px monospace"

animate()