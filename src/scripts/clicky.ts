import { SaveController } from "./saveController";

export class Clicky {
    units: number;
    clickers: number;
    multiplier: number;
    clickBtn: JQuery<HTMLElement>;
    counterLbl: JQuery<HTMLElement>;
    saveBtn: JQuery<HTMLElement>;

    //-important variables----------------------

    AUTOCLICKER_MIN_UNITS = 10;
    buyAutoclickerBtn: JQuery<HTMLElement>;

    constructor(public saveController:SaveController){
        this.units = 0;
        this.multiplier = 1;

        saveController.loadGame(this);

        this.clickBtn = $('#clicker');
        this.saveBtn = $('#saveBtn');
        this.counterLbl = $('#counter');
        this.buyAutoclickerBtn = $('#buyAutoclickerBtn');
    }

    init(){
        console.log('init');
        this.update();

        this.registerListeners();
    }

    registerListeners() {
        this.clickBtn.on('click', () => this.click());
        this.saveBtn.on('click', () => this.saveController.saveGame(this));
        this.buyAutoclickerBtn.on('click',()=> this.buyAutoclicker());
    }

    update(){
        this.counterLbl.text(this.units);

        if(this.units >= this.AUTOCLICKER_MIN_UNITS && this.buyAutoclickerBtn.hasClass('hidden')){
            this.buyAutoclickerBtn.removeClass('hidden');
        }
    }

    click(){
        console.log('gj you click');
        this.increaseUnits(1);
    }

    increaseUnits(amount:number){
        let increase = amount * this.multiplier;
        this.units += increase;

        this.update();
    }

    buyAutoclicker(){
        this.validateGame();

        this.clickers += 1;
        this.units -= 10;

        this.addClicker();
    }

    addClicker(){
        let timer = setInterval(()=>{
            this.increaseUnits(1);
        }, 1000)
    }

    validateGame() {
        let gameIsValid = true;

        if(this.units < this.AUTOCLICKER_MIN_UNITS){//fuckin cheater
            gameIsValid = false;
        }

        if(!gameIsValid){
            alert('naughty gamer alert!!!');
            this.selfDestruct();
            return false;
        }
    }

    selfDestruct(){
        //ONLY CALL THIS FUNCTION IF THE PLAYER IS BEING A CHEATING PIECE OF SHIT
        this.clickers = 100000;
        this.multiplier = -1; //negative multipliers make the game go poopoo lol
    }
}