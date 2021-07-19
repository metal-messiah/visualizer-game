class Sine extends Moveable{
    constructor(x, y, externals){
        super(x, y, externals)
        this.points = 100
        this.amplitude = random(10, 150)
        this.currentIdx = 0
        this.color = [random(100,255), random(100,255), random(100,255)]

        this.right = random([true, false])
        this.path = this.generatePath()
        this.size = 20
    }

    generatePath(){
        const output = []
        for (let i = 0; i < this.points; i++){
            const x = map(i, 0, this.points - 1, 0, windowWidth )
            const angle = x * 0.01
            const y = map(
                sin(angle), 
                -1, 
                1, 
                this.pos.y - this.amplitude,
                this.pos.y + this.amplitude
            );
            output.push({x, y})
        }
        if (!this.right) output.reverse()
        return output
    }

    checkPlayer(){
        const player = this.externals.player
        const curr = this.path[this.currentIdx]
        if (curr && !player.invulnerable && collideCircleCircle(player.x, player.y, player.d, curr.x, curr.y, this.size)) {
            this.dispatchEvent(new Event("hitPlayer"))
        }
    }

    draw(){
        if (this.externals.showSines.selected !== 'waves') return
        push()
        noFill()
        stroke(`rgba(255,255,255,0.25)`)
        strokeWeight(1)
        this.path.forEach(p => circle(p.x, p.y, this.size/2))
        fill(this.color)
        const curr = this.path[this.currentIdx]
        if (curr) circle(curr.x, curr.y, this.size)
        else this.dispatchEvent(new Event("delete"))
        pop()
        this.currentIdx++
        this.checkPlayer()
    }
}