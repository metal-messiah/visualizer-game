class Bars extends EventTarget{
    constructor(externals){
        super()
        this.externals = externals
        this.bars = []
    }

    draw(){
        const {amp, stage, showBars} = this.externals

        if (showBars.selected !== 'bars') return
            push()
            noStroke()
            this.bars = amp.spectrum.slice(0, 3 * amp.spectrum.length/4)
                .map((s, i, vals) => {
                    return {
                        x: map(i, 0, vals.length-1, stage.padding/2, windowWidth - stage.padding/2),
                        y: map(s, 0, 255, windowHeight - stage.padding/2, 3 * windowHeight/4),
                        w: ((windowWidth - stage.padding) / vals.length) - 10,
                        h: windowHeight - stage.padding/2,
                        s
                    }
                })
                .forEach((r, i, vals) => {
                    fill(r.s, map(i, 0, vals.length -1, 0, 255), r.s)
                    rect(r.x, r.y, r.w, r.h)
                })
            pop()
        
    }
}