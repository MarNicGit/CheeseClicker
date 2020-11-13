import { Game } from "../game";
import { ClickerCollection } from "../models/clickers/clickerCollection";
import { Savegame } from "../models/savegame";
import { Ticker } from "../models/ticker";
import { Toast } from "../models/toast";

export class SaveController{

    SAVEGAME_KEY = 'cheeseclicker_save';
    storage: Storage;
    public autosaveTicker: Ticker;

    constructor(public game: Game){
        this.storage = window.localStorage;
    }

    /**
     * Initiates the autosaver
     * @param game Game instance
     */
    initAutosave(){
        this.autosaveTicker = new Ticker(()=>{this.saveGame(this.game);}, 5*60*1000); //5 minutes
    }

    loadGame(){
        let existingSave = this.storage.getItem(this.SAVEGAME_KEY);

        if(existingSave == null || existingSave == 'undefined' || existingSave == ''){ //empty string really shouldn't happen but oh well
            console.log('No savegame found!');
            return;
        }
        let loadedSave : any; //parsing savegames is a bitch so fuck typing I guess
        try {
            loadedSave = JSON.parse(existingSave);

            this.game.unitsRaw = loadedSave.unitsRaw;
            this.game.options = loadedSave.options;
            this.game.startedSessionAt = loadedSave.startedSessionAt;

            for (let key in loadedSave.clickerCollection) {
                if (Object.prototype.hasOwnProperty.call(loadedSave.clickerCollection, key)) {
                    const element = loadedSave.clickerCollection[key];
                    key = key.charAt(0).toLowerCase() + key.slice(1);
                    let clicker = (this.game.clickers as any)[key];
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

    saveGame(game?:Game){
        //TODO: add encryption or whatever to piss off cheaters lol
        let saveGame = new Savegame(this.game??game);


        this.storage.setItem(this.SAVEGAME_KEY, JSON.stringify(saveGame));
        console.log(`Savegame saved with ${saveGame.unitsRaw} units!`);
        let toast = new Toast('Saved!','','');
        this.game.toastController.toast(toast);
    }

    /**
     * Wipes the savefile
     *
     * TODO: super dollars or whatever for a permanent boost
     */
    resetGame(){
        this.storage.removeItem(this.SAVEGAME_KEY);

        this.game.clickers.reset();

        this.game.clickers = new ClickerCollection(this.game);

        this.game.unitsRaw = 0;
        this.game.baseMultiplier = 1;

        this.game.startedSessionAt = Date.now();

        console.log(`Savegame wiped!`);
    }
}