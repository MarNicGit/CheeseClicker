import { SaveController } from "./controllers/saveController";
import { ClickerCollection } from "./models/clickers/clickerCollection";
import { UpdateOperation } from "./enums/updateOperation";
import { ClickerType } from "./models/clickers/clickerType";
import { GuiController } from "./controllers/guiController";
import { Ticker } from "./models/ticker";
import { Stat } from "./models/stat";
import { ToastController } from "./controllers/toastController";

export class Game {
    unitsRaw: number;
    clickers: ClickerCollection;
    clickMultiplier: number;
    baseMultiplier: number;
    clickStat: Stat;

    /**
     * Ticker that steers all game logic + gui
     */
    public gameTicker: Ticker;
    public TICKER_INTERVAL = 50; //ms

    public gui: GuiController;
    public saveController: SaveController;
    public toastController: ToastController;

    public get units() : number {
        return Math.round(this.unitsRaw);
    }

    //-important variables----------------------
    UNIT = 'cheese';

    //-autoclicker multipliers------------------
    multi_autoClicker: Number;

    constructor(){
        this.unitsRaw = 0;
        this.baseMultiplier = 1;
        this.clickMultiplier = 1;
        this.clickStat = new Stat();

        this.clickers = new ClickerCollection(this);
        this.saveController = new SaveController(this);

        this.saveController.loadGame();
        this.saveController.initAutosave();

        this.gui = new GuiController(this);
        this.toastController = new ToastController();
        this.initTicker();
    }

    initTicker(){
        this.gameTicker = new Ticker(()=>{
            this.gui.updateState();
            this.clickers.updateState();
        }, this.TICKER_INTERVAL);
    }

    click(){
        let amount = 1;
        this.updateUnits(amount);
        this.clickStat.update(amount);
    }

    /**
     * Updates the unit counter. Returns false if we're trying to subtract more than we have, otherwise returns true.
     * @param amount Amount to add or subtract
     * @param operation Add or subtract, defaults to add
     */
    updateUnits(amount:number, operation:UpdateOperation = UpdateOperation.Add){
        let sum = (amount * this.baseMultiplier);

        switch (operation) {
            case UpdateOperation.Add:
                this.unitsRaw += sum;
                return true;
            case UpdateOperation.Subtract:
                //if this brings us under zero, assume the player is just really fast and the GUI didn't keep up!
                if(this.unitsRaw - sum < 0){
                    return false;
                }

                this.unitsRaw -= sum;
                return true;
        }
    }

    buyClicker(type:ClickerType){
        this.validateGame();

        this.clickers.addClicker(type);
    }

    validateGame() {
        let gameIsValid = true;

        if(this.units < 0){//fuckin cheater
            gameIsValid = false;
        }

        if(!gameIsValid){
            alert('naughty gamer alert!!!');
            this.selfDestruct();
            return false;
        }
    }

    /**
     * ONLY CALL THIS FUNCTION IF THE PLAYER IS BEING A CHEATING PIECE OF SHIT
     */
    selfDestruct(){
        this.baseMultiplier = -1; //negative multipliers make the game go poopoo lol
    }
}
