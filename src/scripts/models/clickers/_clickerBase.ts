import { Game } from "../../game";
import { ClickerType } from "../../enums";
import { Ticker } from "../ticker";

export class ClickerBase{
    amount: number;
    baseInterval = 1000; //interval is always 1000 ms
    baseIncrement:number;
    baseCost:number;
    costGrowthFactor:number;
    multiplier:number;
    ticker:Ticker;
    clickerType: ClickerType;
    element: JQuery<HTMLElement>;

    constructor(public game:Game){
        this.amount = 0;
        // this.element = game.
    }

    init(){
        console.log(`interval is ${this.baseInterval}`);
        this.ticker = new Ticker(()=>{
            this.updateClicker();
        }, this.baseInterval);
    }

    updateClicker(){
        if(this.amount < 1) return;

        let increment = this.baseIncrement * this.amount;

        this.game.updateUnits(increment);
    }

    getCost(){
        let cost = this.amount > 0
            ? this.baseCost * Math.pow(this.costGrowthFactor, this.amount)
            : this.baseCost;

        return Math.round(cost);
    }
}