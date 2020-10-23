export class Ticker{
    ticker: number;
    interval:number;
    constructor(fn: Function, interval: number){
        this.interval = interval;
        this.ticker = window.setInterval(()=>{
            fn();
        }, this.interval);
    }

    stop(){
        clearInterval(this.ticker);
    }
}