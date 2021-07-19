class Laser extends Moveable{
    constructor(dir, x, y, externals) {
        super(x, y, externals)
        this.fullWidth = 50
        this.preWidth = 25
        this.currentWidth = this.preWidth
        // up or right or diagonal
        this.origDir = dir
        this.dir = this.getDir(dir, x, y)
        this.horiz = x === 0
        this.fullAlpha = 1
        this.preAlpha = 0.5
        this.currentAlpha = this.preAlpha
        this.easing = 0.1
        this.blasting = false

        this.newLocation()

        this.moving = true
        this.blastedAt = null
        this.deleteAfter = 3000
        this.lifeSpan = 15000
        this.deleting = false;

        this.externals.amp.addEventListener("bump", () => {
            if (!this.blasting && !this.moving){
                this.blasting = true
                this.blastedAt = new Date()
                setTimeout(() => {
                    this.blasting = false
                    this.newLocation()
                    this.moving = true
                }, externals.bumpDelay)
            }
        })

        setTimeout(() => {
            this.deleting = true
        }, this.lifeSpan)
    }
    
    newLocation(){
        const padding = this.externals.stage.padding/2
        if (this.horiz) this.newPos = createVector(this.pos.x, random(padding, windowHeight - padding))
        if (!this.horiz) this.newPos = createVector(random(padding, windowWidth - padding), windowHeight)
                    
        this.newDir = this.getDir(this.origDir, this.newPos.x, this.newPos.y)
    }

    checkPlayer(){
        const player = this.externals.player
        const laser = this.horiz ? 
            {x: this.pos.x, y:this.pos.y - this.currentWidth/2, width: windowWidth, height: this.currentWidth} :
            {x: this.pos.x - this.currentWidth/2, y:0, width: this.currentWidth, height: windowHeight}
        if (!player.invulnerable && this.currentAlpha > 0.9 && collideRectCircle(laser.x, laser.y, laser.width, laser.height, player.x, player.y, player.d)) this.dispatchEvent(new Event("hitPlayer"))
    }

    getDir(dir, x, y){
        return !dir ? createVector(windowWidth, y) : createVector(x, 0)
    }

    move(){
        if (this.horiz) {
            this.pos.y += (this.newPos.y - this.pos.y) * this.easing
            this.dir.y += (this.newDir.y - this.dir.y) * this.easing
            if (Math.abs(this.pos.y - this.newPos.y) < 0.01) this.moving = false
        }
        if (!this.horiz) {
            this.pos.x += (this.newPos.x - this.pos.x) * this.easing
            this.dir.x += (this.newDir.x - this.dir.x) * this.easing
            if (Math.abs(this.pos.x - this.newPos.x) < 0.01) this.moving = false
        }
        if (!this.moving){
            setTimeout(() => {
                const now = new Date()
                const diff = now - this.blastedAt;
                if (new Date(diff).getSeconds() > this.deleteAfter/1000) {
                    this.deleting = true
                }
            }, this.deleteAfter)
        }
    }

    showPath(){
        push()
        strokeWeight(this.currentWidth)
        stroke(`rgba(255,255,255,${this.currentAlpha})`)
        line(this.pos.x, this.pos.y, this.dir.x, this.dir.y)
        pop()
    }

    checkBlast() {
        if(this.currentWidth < this.fullWidth && this.blasting) {
            this.currentWidth += (this.fullWidth - this.currentWidth) * this.easing
            this.currentAlpha += (this.fullAlpha - this.currentAlpha) * this.easing
        }
        if(!this.blasting) {
            this.currentWidth = this.preWidth
            this.currentAlpha = this.preAlpha
        }
    }

    draw() {
        if (this.externals.showLasers.selected !== 'lasers') return
        if (this.deleting) {
            this.currentAlpha = this.preAlpha
            this.currentWidth -= 0.5
            this.showPath()
            if (this.currentWidth <= 0) this.dispatchEvent(new Event("delete"))
            return
        }
        this.checkBlast()
        this.showPath()
        this.checkPlayer()

        if (this.moving) this.move()
    }
}