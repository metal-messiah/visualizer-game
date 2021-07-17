class Timer{
    constructor(){
        this.time = 0
    }

    draw(){
        setTimeout(this.time + 1, 1000)
        push()
        stroke('white')
        fill('white')
        textAlign(CENTER, CENTER)
        textSize(16)
        text(this.time, 50, 50)
        pop()
    }
} 