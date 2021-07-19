class Beatbomb extends Moveable{
    constructor (x, externals) {
        super(x, windowHeight, externals)
        this.size = random(50, 100)
        this.target = createVector(this.pos.x, this.pos.y - random(windowHeight / 4, windowHeight - 200))

        this.maxSpeed = 5
        this.maxForce = 1
    }

    draw() {
        if (this.externals.showBeatBombs.selected !== 'beat bombs') return
            const seek = this.arrive(this.target)
            this.applyForce(seek)
            this.update()
            this.drawPath()
            push()
            noStroke()
            fill([random(0,255), random(0,255), random(0,255)])
            circle(this.pos.x, this.pos.y, this.size)
            pop()
        
    }

    drawPath(){
        const nodes = []
        for (let i = 0; i < 5; i++){
            const step = map(i, 0, 4, 0.2, 1)
            nodes.push({
                x: this.target.x,
                y: p5.Vector.lerp(this.pos, this.target, step).y,
                size: step * 30
            })
        }
        push()
        fill(`rgba(255,255,255,0.25)`)
        noStroke()
        nodes.forEach(n => circle(n.x, n.y, n.size))
        circle(this.target.x, this.target.y, this.size)
        pop()
    }

    burst() {
        if(Math.abs(this.target.y - this.pos.y) < 1){
            this.dispatchEvent(new Event('burst'))
        }
    }
}