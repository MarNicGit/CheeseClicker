import { Game } from "../game";
import { ClickerType } from "../enums";
import { ClickerCollection } from "./clickers/clickerCollection";

export class Savegame{
    unitsRaw: number;
    clickerCollection: any; //TODO: make this a proper type

    constructor(game:Game){
        this.unitsRaw = game.unitsRaw;
        this.clickerCollection = {};
        game.clickers.listClickers().forEach(clicker => {
            this.clickerCollection[ClickerType[clicker.clickerType]] = {};
            this.clickerCollection[ClickerType[clicker.clickerType]]['amount'] = clicker.amount; //yo this is dirty as fuck
        });
        console.log(this.clickerCollection);
    }
}
