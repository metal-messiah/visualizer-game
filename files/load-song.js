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
        fill(0)
        rect(windowWidth - this.x, this.y, this.width, this.height)
        fill(255)
        textAlign(CENTER, CENTER)
        if (!this.song) text('Load Song', windowWidth - 65, this.height)
        if (this.song) text(this.song.name, windowWidth - 65, this.height)
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
      console.log(this.song)
    }
}