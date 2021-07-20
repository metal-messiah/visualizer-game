class LoadSong{
    constructor(x, y){
        this.x = x
        this.y = y
        this.width = 100
        this.height = 50

        this.song = null
    }

    draw(){
        push()
        fill(`rgba(0,0,0,0.7)`)
        stroke(255)
        strokeWeight(1)
        rect(this.x, this.y, this.width, this.height)
        fill(255)
        noStroke()
        textAlign(CENTER, CENTER)
        if (!this.song) text('Load Song', this.x + this.width/2, this.y + this.height/2)
        if (this.song) text(this.song.name.substr(0, 8) + '...', this.x + this.width/2, this.y + this.height/2)
        pop()
    }

    checkClick(){
        if (collidePointRect(mouseX, mouseY, this.x, this.y, this.width, this.height)){
            const input = document.querySelector("input")
            input.click()
        }
    }

    handleFile(file){
      this.song = file
    }
}