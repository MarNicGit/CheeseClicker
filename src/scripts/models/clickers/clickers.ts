import { Game } from "../../game";
import { ClickerType } from "./clickerType";
import { ClickerBase } from "./clickerBase";

export class AutoClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 0.5;
        this.baseCost = 10;
        this.clickerType = ClickerType.AutoClicker;
        this.label = 'Autoclicker';
        this.formalString = 'autoclicker';
    }
}

export class MouseClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 1;
        this.baseCost = 100;
        this.clickerType = ClickerType.MouseClicker;
        this.label = 'Mouse';
        this.formalString = 'mouse';
    }
}

export class CowClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 10;
        this.baseCost = 1500;
        this.clickerType = ClickerType.CowClicker;
        this.label = 'Cow';
        this.formalString = 'cow';
    }
}

export class MineClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 100;
        this.baseCost = 10000;
        this.clickerType = ClickerType.MineClicker;
        this.label = 'Mine';
        this.formalString = 'mine';
    }
}

export class HedgefundClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 1000;
        this.baseCost = 100000;
        this.clickerType = ClickerType.HedgefundClicker;
        this.label = 'Hedgefund';
        this.formalString = 'hedgefund';
    }
}