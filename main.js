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
        bubb.r ++
    }
}


let score = 0;
window.onkeyup = function(e){
    switch (e.key === " "){
        case bubb.r < 10:
            score += 10
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
}

function animate(){
    requestAnimationFrame(animate)
    bubb.draw()

    
    ctx.fillText(score, 20, 50)

}

ctx.font = "48px monospace"

animate()