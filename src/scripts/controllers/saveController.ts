import { Clicky } from "../clicky";
import { ClickerType } from "../enums";
import { ClickerCollection } from "../models/clickers/clickerCollection";
import { Savegame } from "../models/savegame";

export class SaveController{

    SAVEGAME_KEY = 'clicky_save';
    storage: Storage;

    constructor(){
        this.storage = window.localStorage;
    }

    loadGame(game:Clicky){
        let existingSave = this.storage.getItem(this.SAVEGAME_KEY);

        if(existingSave == null || existingSave == 'undefined' || existingSave == String.Empty){ //empty string really shouldn't happen but oh well
            console.log('No savegame found!');
            return;
        }
        let loadedSave : any; //parsing savegames is a bitch so fuck typing I guess
        try {
            loadedSave = JSON.parse(existingSave);

            game.unitsRaw = loadedSave.unitsRaw;

            for (let key in loadedSave.clickerCollection) {
                if (Object.prototype.hasOwnProperty.call(loadedSave.clickerCollection, key)) {
                    const element = loadedSave.clickerCollection[key];
                    key = key.charAt(0).toLowerCase() + key.slice(1);
                    (game.clickers as any)[key].amount = element.amount; //TODO get rid of 'any' filth
                }
            }

            console.log(`Savegame loaded, ${loadedSave.unitsRaw} units!`);
        } catch (error) {
            console.error('Failed to parse savegame!');
            console.error(error);
        }
    }

    saveGame(game:Clicky){
        //TODO: add encryption or whatever to piss off cheaters lol
        let saveGame = new Savegame(game);

        this.storage.setItem(this.SAVEGAME_KEY, JSON.stringify(saveGame));
        console.log(`Savegame saved with ${saveGame.unitsRaw} units!`);
    }

    /**
     * Wipes the savefile
     *
     * TODO: super dollars or whatever for a permanent boost
     * @param game Clicky game
     */
    resetGame(game:Clicky){
        this.storage.removeItem(this.SAVEGAME_KEY);

        //kill off all tickers
        game.clickers.listClickers().forEach(clicker => {
            clicker.ticker.stop();
        });

        game.clickers = new ClickerCollection(game);

        game.unitsRaw = 0;
        game.baseMultiplier = 1;

        console.log(`Savegame wiped!`);
    }
}