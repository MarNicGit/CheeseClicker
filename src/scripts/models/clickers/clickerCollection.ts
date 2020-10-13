import { Game } from "../../game";
import { ClickerType } from "../../enums";
import { UpdateOperation } from "../../enums/UpdateOperation";
import * as clickers from "./clickers";
import { ClickerBase } from "./_clickerBase";

export class ClickerCollection{

    autoClicker: clickers.AutoClicker;
    kiloClicker: clickers.KiloClicker;
    megaClicker: clickers.MegaClicker;
    gigaClicker: clickers.GigaClicker;
    teraClicker: clickers.TeraClicker;

    addClicker(type:ClickerType) {
        let clicker = this.getClicker(type);
        this.game.updateUnits(clicker.getCost(), UpdateOperation.Subtract);
        clicker.amount += 1;
    }

    public listClickers():Array<ClickerBase> //this can probably be better I guess
    {
        let clickerList = [
            this.autoClicker,
            this.kiloClicker,
            this.megaClicker,
            this.gigaClicker,
            this.teraClicker
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

    constructor(public game: Game) {
        this.autoClicker = new clickers.AutoClicker(game);
        this.kiloClicker = new clickers.KiloClicker(game);
        this.megaClicker = new clickers.MegaClicker(game);
        this.gigaClicker = new clickers.GigaClicker(game);
        this.teraClicker = new clickers.TeraClicker(game);
    }
}