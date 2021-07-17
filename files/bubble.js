

class Bubble extends Moveable{
    constructor(x, y, width, height, externals){
        super(x, y)
        const {stage, amp, bumpDelay} = externals
        this.width = width
        this.height = height

        this.speed = 0.01

        this.dir = createVector(random(0, this.speed), random(-this.speed, this.speed))

        this.lastChange = null

        this.stage = stage

        this.amp = amp
        this.amp.addEventListener("bump", () => this.bump())

        this.bumpDelay = bumpDelay

        this.bumping = false;
        this.checkDir = true
    }

    draw(){
        const {x, y} = this.pos
        const {width, height} = this
        this.showPath()
        push()
        fill('maroon')
        // rect(x, y, width, height) 
        circle(x, y, min(width, height))
        pop()

        this.applyForce(this.dir)
        this.update()
        this.checkDirection()
        this.checkPlayer()
        this.showPath(this.width)
    }

    checkPlayer(){
        if (collidePointRect(mouseX, mouseY, this.pos.x, this.pos.y, this.width, this.height)) this.dispatchEvent(new Event("hitPlayer"))
    }

    bump() {
        if (!this.bumping) {
            this.bumping = true
            // this.applyForce(createVector(this.dir.x * 1000, this.dir.y * 1000))
            this.vel.mult(5)
            this.dispatchEvent(new Event("bump"))
            setTimeout(() => {
                this.bumping = false
                // this.applyForce(createVector(this.dir.x * -1000, this.dir.y * -1000))
                this.vel.div(5)
            }, this.bumpDelay)
        }
    }

    checkDirection(){
        let hit = false
        // hit right
        if(this.checkDir) {
        if (this.pos.x + this.width >= windowWidth && this.lastChange !== 'right') {
            this.vel = createVector(-1 * this.vel.x, this.vel.y)
            this.dir = createVector(random(-1 * this.speed, 0), this.dir.y)
            this.lastChange = 'right'
            hit = true
        }
        // hit left
        if (this.pos.x <= 0 && this.lastChange !== 'left') {
            this.vel = createVector(-1 * this.vel.x, this.vel.y)
            this.dir = createVector(random(0, this.speed), this.dir.y)
            this.lastChange = 'left'
            hit = true
        }
        // hit bottom
        if (this.pos.y + this.height >= windowHeight && this.lastChange !== 'bottom') {
            this.vel = createVector(this.vel.x, -1 * this.vel.y)
            this.dir = createVector(this.dir.x, random(-1 * this.speed, 0))
            this.lastChange = 'bottom'
            hit = true
        }
        // hit top
        if (this.pos.y <= 0 && this.lastChange !== 'top') {
            this.vel = createVector(this.vel.x, -1 * this.vel.y)
            this.dir = createVector(this.dir.x, random(0, this.speed))
            this.lastChange = 'top'
            hit = true
        }
    }
    if(this.speed === 10) {
        this.checkDir = false
    }
        if (hit) this.dispatchEvent(new Event("hitWall"))
    }
}