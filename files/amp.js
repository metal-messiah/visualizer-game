class Amp extends EventTarget{
    constructor(amp){
        super()
        this.amp = new p5.Amplitude()
        this.fft = new p5.FFT(0.9, 64)
    }

    avgArr(arr){
        return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
    }

    checkLevel(){
        if (this.level > 30 && this.lows > 200) {
            this.dispatchEvent(new Event("bump"))
        }

        if (this.mids > 50){
            this.dispatchEvent(new Event("bounce"))
        }
    }

    get spectrum(){
        return this.fft.analyze()
    }

    get bg(){
        return [this.lows, this.mids, this.highs]
    }

    get highs(){
        return this.avgArr(this.spectrum.slice(2* this.spectrum.length / 3))
    }

    get mids(){
        return this.avgArr(this.spectrum.slice(this.spectrum.length / 3, 2 * this.spectrum.length / 3))
    }

    get lows(){
        return this.avgArr(this.spectrum.slice(0, this.spectrum.length / 3))
    }

    get level(){
        return this.amp.getLevel() * 100
    }
}