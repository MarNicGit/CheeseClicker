export class Ticker{
    ticker: number;
    interval:number;
    isActive: boolean;
    fn: Function;

    /**
     * Wrapper for window.setInterval. Makes it easier to track running intervals and
     * @param fn function to perform every interval
     * @param interval interval in ms
     */
    constructor(fn: Function, interval: number){
        this.interval = interval;
        this.fn = fn;

        this.init();
    }

    init() {
        this.ticker = window.setInterval(()=>{
            this.fn();
        }, this.interval);
        this.isActive = true;
    }

    stop(){
        clearInterval(this.ticker);
        this.isActive = false;
    }

    resume(){
        this.init();
    }
}