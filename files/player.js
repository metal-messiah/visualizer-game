class Player{
    constructor(externals){
        this.externals = externals
        this.maxHealth = 6
        this.health = this.maxHealth
        this.x = windowWidth / 2
        this.y = windowHeight / 2
        this.d = 25

        this.debounce = 1000
        this.debouncing = false

        this.initialSpeed = 5
        this.speed = this.initialSpeed

        this.boosting = false
        this.cooling = false
        this.invulnerable = false

        this.pulse = null
    };

    boost(){
        if (!this.boosting && !this.cooling && this.externals.playMode.selected === 'keyboard'){
            this.boosting = true
            this.invulnerable = true
            this.speed = this.speed * this.speed
            setTimeout(() => {
                this.boosting = false
                this.speed = this.initialSpeed
                this.invulnerable = false
                this.cooling = true
                setTimeout(() => this.cooling = false, 300)
            }, 100)
        }
    }

    draw(){
        push()
        stroke(255)
        strokeWeight(1)
        fill(0)
        circle(this.x, this.y, this.d)
        textAlign(CENTER, CENTER)
        fill(255)
        noStroke()
        text(this.health, this.x, this.y)
        pop()

        const {stage, playMode} = this.externals
        const padding = this.d /2

        if (playMode.selected === 'keyboard'){
            if(keyIsDown(87) || keyIsDown(UP_ARROW)) {
                if (this.y > stage.padding/2 + padding) this.y -= this.speed
            } 
            if (keyIsDown(65) || keyIsDown(LEFT_ARROW)){
                if (this.x > stage.padding/2 + padding) this.x -= this.speed
            } 
            if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
                if (this.x < windowWidth - stage.padding/2 - padding) this.x += this.speed
            } 
            if (keyIsDown(83) || keyIsDown(DOWN_ARROW)){
                if (this.y < windowHeight - stage.padding/2 - padding) this.y += this.speed
            }
        } else {
            this.x = constrain(mouseX, stage.padding/2 + padding, windowWidth - stage.padding/2 - padding)
            this.y = constrain(mouseY, stage.padding/2 + padding, windowHeight - stage.padding/2 - padding)
        }
    }

    hurt(){
        if (!this.debouncing && !this.invulnerable){
            this.debouncing = true
            this.health--
            this.pulse = setInterval(() => {
                this.d = random(20, 40)
            }, 100)
            setTimeout(() => {
                this.debouncing = false
                this.d = 25
                clearInterval(this.pulse)
                this.pulse = null
            }, this.debounce)
        }
    }
}