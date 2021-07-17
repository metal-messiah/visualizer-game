class Slider{
    constructor(x,y, leftText, rightText){
        this.x = x
        this.y = y
        this.leftText = leftText
        this.rightText = rightText
        this.left = true
        this.width = 100
        this.height = 25
    }

    draw(){
        push()
        stroke(255)
        strokeWeight(1)
        rect(this.x, this.y, this.width, this.height)
        noStroke()
        fill(255)
        if (this.left){
            rect(this.x, this.y, this.width/2, this.height)
        } else {
            rect(this.x + 50, this.y, this.width/2, this.height)
        }
        textAlign(CENTER, CENTER)
        fill(this.left ? 'orange' : 255)
        text(this.leftText, this.x - this.width * 0.5, this.y + this.height/2)
        fill(!this.left ? 'orange' : 255)
        text(this.rightText, this.x + this.width * 1.5, this.y + this.height/2)
        pop()
    }

    get selected(){
        return this.left ? this.leftText.toLowerCase() : this.rightText.toLowerCase()
    }

    checkClick(){
        if (collidePointRect(mouseX, mouseY, this.x, this.y, this.width, this.height)){
            this.left = !this.left
        }
    }
}