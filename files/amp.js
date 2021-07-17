class Amp extends EventTarget{
    constructor(amp){
        super()
        this.amp = new p5.Amplitude()
        this.fft = new p5.FFT(0.9, 32)
        this.bumpAt = 45
    }

    checkLevel(){
        if (this.level > this.bumpAt) {
            this.dispatchEvent(new Event("bump"))
        }
    }

    get bg(){
        const spectrum = this.fft.analyze()
        const lows = spectrum.slice(0, spectrum.length / 3)
        const mids = spectrum.slice(spectrum.length / 3, 2 * spectrum.length / 3)
        const highs = spectrum.slice(2* spectrum.length / 3)

        const avg = (arr) => arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
        return [avg(lows), avg(mids), avg(highs)]
    }

    get level(){
        return this.amp.getLevel() * 100
    }
}