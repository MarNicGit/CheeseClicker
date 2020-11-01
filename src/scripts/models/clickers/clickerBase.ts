import { Game } from "../../game";
import { Stat } from "../stat";
import { ClickerType } from "./clickerType";

export class ClickerBase {

    amount: number;
    formalString: string;
    label: string;
    baseIncrement: number;
    baseCost: number;
    costGrowthFactor: number;
    multiplier: number;
    clickerType: ClickerType;
    hasRendered: boolean = false;
    stat: Stat;

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
        this.costGrowthFactor = 1.2;
        this.multiplier = 1;
        this.stat = new Stat();
    }

    getIncrement() {
        if (this.amount < 1) return 0;

        let increment = this.baseIncrement * this.amount * this.multiplier;

        let perTick = this.game.TICKER_INTERVAL / 1000; //per 1 second

        return increment * perTick;
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
        <div id="${this.elementName}" class="btn-clicker" data-type="${ClickerType[this.clickerType]}" disabled="false">
            ${this.renderInnerButton()}
        </div>
        `;

        return html;
    }

    renderInnerButton():string{
        let amountLbl = this.amount > 0 ? this.amount.toString() : '';

        return `
        <div class="icon icon-${this.formalString}">
            <div class="label-amount">${amountLbl}</div>
        </div>
        <span class="label">${this.label}</span>
        <span class="label-cost">🧀 ${this.getCost()}</span>`;
    }
}