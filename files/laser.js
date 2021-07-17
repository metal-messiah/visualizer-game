class Laser extends EventTarget{
    constructor(dir, x, y, externals) {
        super()
        this.fullWidth = 50
        this.preWidth = 25
        this.currentWidth = this.preWidth
        // up or right or diagonal
        this.dir = !dir ? createVector(windowWidth, y) : createVector(x, 0)
        this.pos = createVector(x, y)
        this.fullAlpha = 1
        this.preAlpha = 0.5
        this.currentAlpha = this.preAlpha
        this.easing = 0.1
        this.blasting = false
        externals.amp.addEventListener("bump", () => {
            if (!this.blasting){
                this.blasting = true
                setTimeout(() => this.blasting = false, externals.bumpDelay)
            }
        })
    }

    checkHitPlayer() {
        if (this.pos.y && collidePointRect(player.x, player.y, this.pos.x, this.pos.y, windowWidth, this.currentWidth)) this.dispatchEvent(new Event("hitPlayer"))
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
        this.checkBlast()
        this.showPath()
        this.checkHitPlayer()
    }
}