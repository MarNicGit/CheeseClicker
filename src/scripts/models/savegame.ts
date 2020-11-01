import { Game } from "../game";
import { ClickerType } from "./clickers/clickerType";

export class Savegame{
    unitsRaw: number;
    cheeseGenerated: number;
    clickerCollection: any; //TODO: make this a proper type

    constructor(game:Game){
        this.unitsRaw = game.unitsRaw;
        this.clickerCollection = {};
        this.cheeseGenerated = Math.floor(game.clickStat.cheeseGenerated);
        game.clickers.listClickers().forEach(clicker => {
            this.clickerCollection[ClickerType[clicker.clickerType]] = {};
            this.clickerCollection[ClickerType[clicker.clickerType]]['amount'] = clicker.amount; //yo this is dirty as fuck
            this.clickerCollection[ClickerType[clicker.clickerType]]['cheeseGenerated'] = Math.floor(clicker.stat.cheeseGenerated); //yo this is dirty as fuck
        });
    }
}
