
class downPin {
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
       this.y += 10
       this.draw()
   }
}

let verticalPins = []

setInterval(() => {
    let pinsDown = new downPin(
        Math.max(Math.random() * 800), 0, 10, 75, "grey");
        verticalPins.push(pinsDown)
   
}, Math.random() * 7000);