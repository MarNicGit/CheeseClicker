import { Game } from "../game";
import { ClickerCollection } from "../models/clickers/clickerCollection";
import { Savegame } from "../models/savegame";
import { Ticker } from "../models/ticker";

export class SaveController{

    SAVEGAME_KEY = 'cheeseclicker_save';
    storage: Storage;
    public autosaveTicker: Ticker;

    constructor(){
        this.storage = window.localStorage;
    }

    /**
     * Initiates the autosaver
     * @param game Game instance
     */
    initAutosave(game:Game){
        this.autosaveTicker = new Ticker(()=>{
            this.saveGame(game);
        }, 5*60*1000); //5 minutes
    }

    loadGame(game:Game){
        let existingSave = this.storage.getItem(this.SAVEGAME_KEY);

        if(existingSave == null || existingSave == 'undefined' || existingSave == ''){ //empty string really shouldn't happen but oh well
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
                    let clicker = (game.clickers as any)[key];
                    clicker.amount = element.amount; //TODO get rid of 'any' filth
                    clicker.stat.cheeseGenerated = element.cheeseGenerated ?? 0;
                }
            }

            console.log(`Savegame loaded, ${loadedSave.unitsRaw} units!`);
        } catch (error) {
            console.error('Failed to parse savegame!');
            console.error(error);
        }
    }

    saveGame(game:Game){
        //TODO: add encryption or whatever to piss off cheaters lol
        let saveGame = new Savegame(game);

        this.storage.setItem(this.SAVEGAME_KEY, JSON.stringify(saveGame));
        console.log(`Savegame saved with ${saveGame.unitsRaw} units!`);
    }

    /**
     * Wipes the savefile
     *
     * TODO: super dollars or whatever for a permanent boost
     * @param game Game instance
     */
    resetGame(game:Game){
        this.storage.removeItem(this.SAVEGAME_KEY);

        game.clickers.reset();

        game.clickers = new ClickerCollection(game);

        game.unitsRaw = 0;
        game.baseMultiplier = 1;

        console.log(`Savegame wiped!`);
    }
}