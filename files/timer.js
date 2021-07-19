class Timer{
    constructor(){
        this.startingTime = new Date()
    }

    draw(){
        const now = new Date()
        push()
        stroke('white')
        fill('white')
        textAlign(CENTER, CENTER)
        textSize('24pt')
        text(new Date(now - this.startingTime).getSeconds(), 15, 15)
        pop()
    }
} 