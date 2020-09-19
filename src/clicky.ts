import { SaveController } from "./saveController";

export class Clicky {
    units: number;
    multiplier: number;
    clickBtn: JQuery<HTMLElement>;
    counterLbl: JQuery<HTMLElement>;
    saveBtn: JQuery<HTMLElement>;

    constructor(public saveController:SaveController){
        this.units = 0;
        //TODO add the loading stuff here I guess
        this.multiplier = 1;

        this.clickBtn = $('#clicker');
        this.saveBtn = $('#saveBtn');
        this.counterLbl = $('#counter');        
    }

    init(){
        console.log('init');
        this.update();

        this.registerListeners();        
    }

    registerListeners() {
        this.clickBtn.on('click', () => this.click());
        this.saveBtn.on('click', () => this.saveController.saveGame(this));
    }

    update(){
        this.counterLbl.text(this.units);
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
}