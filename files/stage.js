class Stage{
    constructor(padding){
        this.padding = padding
        this.width = windowWidth - this.padding
        this.height = windowHeight - this.padding
        this.pos = createVector(windowWidth/2 - this.width/2, windowHeight/2 - this.height/2)
    }

    draw(){
        fill(40)
        beginShape()
        vertex(0,0)
        vertex(windowWidth, 0)
        vertex(windowWidth, windowHeight)
        vertex(0, windowHeight)

        beginContour()
        vertex(this.pos.x, this.pos.y)
        vertex(this.pos.x, this.pos.y + windowHeight - this.padding)
        vertex(this.pos.x + windowWidth - this.padding, this.pos.y + windowHeight - this.padding)
        vertex(this.pos.x + windowWidth - this.padding, this.pos.y)
        endContour()
        endShape(CLOSE)
    }
}