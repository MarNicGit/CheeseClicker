import { Game } from "../../game";
import { UpdateOperation } from "../../enums/updateOperation";
import * as clickers from "./clickers";
import { ClickerBase } from "./_clickerBase";
import { ClickerType } from "./clickerType";

export class ClickerCollection{

    autoClicker: clickers.AutoClicker;
    mouseClicker: clickers.MouseClicker;
    cowClicker: clickers.CowClicker;
    mineClicker: clickers.MineClicker;
    hedgefundClicker: clickers.HedgefundClicker;

    public activeClickers: Array<ClickerType>;

    addClicker(type:ClickerType) {
        let clicker = this.getClicker(type);
        if(this.game.updateUnits(clicker.getCost(), UpdateOperation.Subtract)){
            clicker.amount += 1;
        }
    }

    public listClickers():Array<ClickerBase> //this can probably be better I guess
    {
        let clickerList = [
            this.autoClicker,
            this.mouseClicker,
            this.cowClicker,
            this.mineClicker,
            this.hedgefundClicker
        ];

        return clickerList;
    }

    public getClicker(type: ClickerType):ClickerBase{
        return this.listClickers().filter(clicker=>clicker.clickerType == type)[0];
    }

    getClickerCost(type: ClickerType) {
        let clicker = this.getClicker(type);

        return clicker.getCost();
    }

    public purchaseClicker(type: ClickerType){
        let clicker = this.getClicker(type);
        if(this.game.units < clicker.getCost()) return;
        clicker.amount += 1;
    }

    constructor(public game: Game) {
        this.autoClicker = new clickers.AutoClicker(game);
        this.mouseClicker = new clickers.MouseClicker(game);
        this.cowClicker = new clickers.CowClicker(game);
        this.mineClicker = new clickers.MineClicker(game);
        this.hedgefundClicker = new clickers.HedgefundClicker(game);
    }
}