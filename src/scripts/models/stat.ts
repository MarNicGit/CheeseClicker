export class Stat{
    public cheeseGenerated : number = 0;

    constructor(){

    }

    public update(cheese:number){
        this.cheeseGenerated += cheese;
    }
}