import { SaveController } from "./controllers/saveController";
import { ClickerCollection } from "./models/clickers/clickerCollection";
import { UpdateOperation } from "./enums/updateOperation";
import { ClickerType } from "./models/clickers/clickerType";
import { GuiController } from "./controllers/guiController";

export class Game {
    unitsRaw: number;
    clickers: ClickerCollection;
    clickMultiplier: number;
    baseMultiplier: number;
    public gui: GuiController;
    public saveController: SaveController;

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

        this.clickers = new ClickerCollection(this);
        this.saveController = new SaveController();

        this.saveController.loadGame(this);
        this.saveController.initAutosave(this);

        this.gui = new GuiController(this);
    }

    click(){
        this.updateUnits(1);
    }

    /**
     * Updates the unit counter. Returns false if we're trying to subtract more than we have, otherwise returns true.
     * @param amount Amount to add or subtract
     * @param operation Add or subtract, defaults to add
     */
    updateUnits(amount:number, operation:UpdateOperation = UpdateOperation.Add){
        let sum = (amount * this.clickMultiplier * this.baseMultiplier);

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
