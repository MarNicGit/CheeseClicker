export class Stat{
    public cheeseGenerated : number;

    constructor(){

    }

    public update(cheese:number){
        this.cheeseGenerated += cheese;
    }
}