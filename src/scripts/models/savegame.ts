import { Clicky } from "../clicky";

export class Savegame{
    units:number;    

    constructor(game:Clicky){
        this.units = game.units;
    }
}
