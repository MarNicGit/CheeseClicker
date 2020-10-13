import { SaveController } from "./controllers/saveController";
import { ClickerCollection } from "./models/clickers/clickerCollection";
import { ClickerType } from "./enums";
import { UpdateOperation } from "./enums/UpdateOperation";
import { uniqueSort } from "jquery";

export class Game {
    unitsRaw: number;
    clickers: ClickerCollection;
    clickMultiplier: number;
    baseMultiplier: number;

    public get units() : number {
        return Math.round(this.unitsRaw);
    }


    //-important variables----------------------
    AUTOCLICKER_MIN_UNITS = 10;
    UNIT = 'cheese';

    //-autoclicker multipliers------------------
    multi_autoClicker: Number;

    constructor(
        public saveController:SaveController
        ){
        this.unitsRaw = 0;
        this.baseMultiplier = 1;
        this.clickMultiplier = 1;

        this.clickers = new ClickerCollection(this);

        saveController.loadGame(this);
        saveController.initAutosave(this);
    }

    init(){
        console.log('init');
    }

    click(){
        console.log('gj you click');
        this.updateUnits(1);
    }

    updateUnits(amount:number, operation:UpdateOperation = UpdateOperation.Add){
        let sum = (amount * this.clickMultiplier * this.baseMultiplier);

        switch (operation) {
            case UpdateOperation.Add:
                this.unitsRaw += sum;
                break;
            case UpdateOperation.Subtract:
                //if this brings us under zero, assume the player is just really fast and the GUI didn't keep up!
                if(this.unitsRaw - sum < 0){
                    break;
                }

                this.unitsRaw -= sum;
                break;
        }
    }

    buyAutoclicker(){
        this.validateGame();

        this.clickers.addClicker(ClickerType.AutoClicker);
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
