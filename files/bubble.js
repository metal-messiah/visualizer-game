

class Bubble extends Moveable{
    constructor(x, y, width, height, externals){
        super(x, y, externals)
        const {stage, amp, bumpDelay, player} = externals
        this.width = min(width, height)
        this.height = min(width, height)

        this.speed = 0.1

        this.dir = createVector(random(-this.speed, this.speed), random(-this.speed, this.speed))

        this.lastChange = null

        this.stage = stage

        this.amp = amp
        // this.amp.addEventListener("bump", () => this.bump())

        this.bumpDelay = bumpDelay
        this.player = player

        this.bumping = false;
        this.checkDir = true

        this.maxSpeed = 5
        this.c = [random(0,255), random(0, 255), random(0, 255)]
    }

    draw(){
        if (this.externals.showBubbles.selected !== 'bubbles') return
        const {x, y} = this.pos

        this.showPath(this.width)
        push()
        fill(this.c)
        noStroke()
        circle(x, y, this.width)
        pop()

        if (this.vel.x < this.maxSpeed || this.vel.y < this.maxSpeed) this.applyForce(this.dir)
        this.update()
        this.checkDirection()
        this.checkPlayer()
        
    }

    checkPlayer(){
        const player = this.player
        if (!player.invulnerable && collideCircleCircle(player.x, player.y, player.d, this.pos.x, this.pos.y, min(this.width, this.height))) {
            this.dispatchEvent(new Event("hitPlayer"))
        }
    }

	showPath(thickness){
        push()
        strokeWeight(thickness)
        stroke('rgba(255,255,255,0.075)')
		const beg = {x: this.pos.x, y: this.pos.y}
		const end = {x: this.pos.x + this.vel.x * 1000000, y: this.pos.y + this.vel.y * 1000000}
        line(beg.x, beg.y, end.x, end.y)
        pop()
    }

    bump() {
        if (!this.bumping) {
            this.bumping = true
            this.vel.mult(5)
            this.dispatchEvent(new Event("bump"))
            setTimeout(() => {
                this.bumping = false
                this.vel.div(5)
            }, this.bumpDelay)
        }
    }

    checkDirection(){
        let hit = false
        // hit right
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
        if (hit) this.dispatchEvent(new Event("hitWall"))
    }
}