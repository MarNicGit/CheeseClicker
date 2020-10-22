import { Game } from "../../game";
import { Ticker } from "../ticker";
import { ClickerType } from "./clickerType";

export class ClickerBase {

    amount: number;
    formalString: string;
    label: string;
    baseInterval = 1000; //TODO: Make this listen to FPS instead
    baseIncrement: number;
    baseCost: number;
    costGrowthFactor: number;
    multiplier: number;
    ticker: Ticker;
    clickerType: ClickerType;
    hasRendered: boolean = false;
    // element: JQuery<HTMLElement>;

    public get isActive(): boolean {
        return this.amount > 0;
    }

    public get elementName():string {
        return `buy${ClickerType[this.clickerType]}btn`;
    }

    /**
     * Returns whether the purchase button can be shown. Player is required to have at least 80% of the basecost.
     */
    public get showBtn():boolean {
        return this.hasRendered || this.amount > 0 || this.game.units >= (this.baseCost * 0.8);
    }

    constructor(public game: Game) {
        this.amount = 0;
        // this.element = game.
    }

    init() {
        console.log(`interval is ${this.baseInterval}`);
        this.ticker = new Ticker(() => {
            this.updateClicker();
        }, this.baseInterval);
    }

    updateClicker() {
        if (this.amount < 1) return;

        let increment = this.baseIncrement * this.amount;

        this.game.updateUnits(increment);
    }

    getCost() {
        let cost = this.amount > 0
            ? this.baseCost * Math.pow(this.costGrowthFactor, this.amount)
            : this.baseCost;

        return Math.round(cost);
    }

    renderButton():string{
        this.hasRendered = true;
        let html = `
        <div id="${this.elementName}" class="btn-clicker" data-type="${ClickerType[this.clickerType]}">
            ${this.renderInnerButton()}
        </div>
        `;

        return html;
    }

    renderInnerButton():string{
        let amountLbl = this.amount > 0 ? this.amount.toString() : '';

        return `
        <div class="icon">
            <div class="label-amount">${amountLbl}</div>
        </div>
        <span class="label">${this.label}</span>
        <span class="label-cost">🧀 ${this.getCost()}</span>`;
    }
}