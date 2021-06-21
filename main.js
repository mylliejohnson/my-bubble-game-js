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
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// create bubble
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

// the bubble
let bubb = new Bubble(canvas.width/2, canvas.height/2, 10, 0, 1*Math.PI);

// key functions
window.onkeydown = function(e){
    if(e.key === " " && bubb.r < 175){
        bubb.r++
    }
}

let score = 0; 
window.onkeyup = function(e){
    switch (e.key === " "){
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

// create pins
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

// interval for pins 
// give min and max y values to be in range with the bubble **
const pinPops = []

setInterval(() => {
    let pins = new Pin(
        canvas.width, Math.max(Math.random() * 500), 75, 10, "grey");
        pinPops.push(pins)
   
}, Math.random() * 5500);

// lives
// let lives = [ "X", "X", "X"]
// function displayLives(lives){
//     for (let life of lives){
//         ctx.fillText(life, canvas.width - 130, canvas.height - 25)
//     }
// }
// displayLives(lives[0], lives[1], lives[2])

// OR , is a function for the array better or a class?

// class Lives{
//     constructor(x, y){
//         this.x = x
//         this.y = y
//     }

//     draw = () => {
//         ctx.fillText(life, canvas.width - 130, canvas.height - 25)

//     }
// }



// animate it!
let animateId = null;

function animate(){
    animateId = requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    bubb.draw()

    ctx.fillText(score, 20, 50)

    // when collision is detected, pop a life off of the array 
    ctx.fillText("XXX", canvas.width - 130, canvas.height - 25) // turn into array to pop off when life is lost!!!

    for(let pins of pinPops){
        pins.move();
    }

    let life = "X"
}

ctx.font = "48px monospace"

animate()