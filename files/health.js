class Health extends Moveable {
    constructor(x, y, externals){
        super(x, y, externals)

        this.size = 32
        this.symbol = '+'
        this.lastChange = ''

        this.speed = 0.1
        this.maxSpeed = 1
        this.dir = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed))

        this.trail = []
        this.trailSize = 5
    }

    draw(){
        push()
        fill('red')
        noStroke()
        textSize(16)
        this.trail.forEach(t => {
            text(`❤️`, t.x, t.y)
        })
        stroke(255)
        strokeWeight(2)
        circle(this.pos.x, this.pos.y, this.size)
        fill(255)
        noStroke()
        textAlign(CENTER, CENTER)
        textSize(this.size)
        text(this.symbol, this.pos.x, this.pos.y - 1)

        
        pop()

        if (Math.abs(this.vel.x) < this.maxSpeed || Math.abs(this.vel.y) < this.maxSpeed) this.applyForce(this.dir)
        this.update()
        this.checkDirection()
        this.checkPlayer()
        if (frameCount % 30 === 0) this.trail.push({x: this.pos.x, y: this.pos.y})
        if (this.trail.length > this.trailSize) this.trail.shift()
    }

    checkDirection(){
        const padding = this?.externals?.stage?.padding /2 || 0
        // hit right
        if (this.pos.x + this.size/2 >= windowWidth - padding && this.lastChange !== 'right') {
            this.vel = createVector(-1 * this.vel.x, this.vel.y)
            this.dir = createVector(random(-1 * this.speed, 0), this.dir.y)
            this.lastChange = 'right'
        }
        // hit left
        if (this.pos.x - this.size/2 <= padding && this.lastChange !== 'left') {
            this.vel = createVector(-1 * this.vel.x, this.vel.y)
            this.dir = createVector(random(0, this.speed), this.dir.y)
            this.lastChange = 'left'
        }
        // hit bottom
        if (this.pos.y + this.size/2 >= windowHeight - padding && this.lastChange !== 'bottom') {
            this.vel = createVector(this.vel.x, -1 * this.vel.y)
            this.dir = createVector(this.dir.x, random(-1 * this.speed, 0))
            this.lastChange = 'bottom'
        }
        // hit top
        if (this.pos.y - this.size/2 <= padding && this.lastChange !== 'top') {
            this.vel = createVector(this.vel.x, -1 * this.vel.y)
            this.dir = createVector(this.dir.x, random(0, this.speed))
            this.lastChange = 'top'
        }
    }

    checkPlayer(){
        const player = this?.externals?.player
        if (collideCircleCircle(player.x, player.y, player.d, this.pos.x, this.pos.y, this.size)) {
            this.dispatchEvent(new Event("hitPlayer"))
        }
    }
}