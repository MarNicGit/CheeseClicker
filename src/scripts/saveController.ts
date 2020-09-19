import { Clicky } from "./clicky";
import { Savegame } from "./models/savegame";

export class SaveController{

    SAVEGAME_KEY = 'clicky_save';
    storage: Storage;

    constructor(){
        this.storage = window.localStorage;
    }

    loadGame(game:Clicky){
        let existingSave = this.storage.getItem(this.SAVEGAME_KEY);

        if(existingSave == null){
            console.log('No savegame found!');
            return;
        }

        let loadedSave = JSON.parse(existingSave) as Savegame;
        game.units = loadedSave.units;

        console.log(`Savegame loaded, ${loadedSave.units} units!`);
    }

    saveGame(game:Clicky){
        //TODO: add encryption or whatever to piss off cheaters lol
        let saveGame = new Savegame(game);

        this.storage.setItem(this.SAVEGAME_KEY, JSON.stringify(saveGame));
        console.log(`Savegame saved with ${saveGame.units} units!`);
    }
}