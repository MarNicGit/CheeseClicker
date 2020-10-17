import { Game } from "../../game";
import { ClickerType } from "./clickerType";
import { ClickerBase } from "./_clickerBase";

export class AutoClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 0.5;
        this.baseCost = 10;
        this.costGrowthFactor = 1.1;
        this.clickerType = ClickerType.AutoClicker;
        this.label = 'Autoclicker';

        this.init();
    }
}

export class MouseClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 1;
        this.baseCost = 100;
        this.costGrowthFactor = 1.2;
        this.clickerType = ClickerType.MouseClicker;
        this.label = 'Mouse';

        this.init();
    }
}

export class CowClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 10;
        this.baseCost = 1500;
        this.costGrowthFactor = 1.3;
        this.clickerType = ClickerType.CowClicker;
        this.label = 'Cow';

        this.init();
    }
}

export class MineClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 50;
        this.baseCost = 10000;
        this.costGrowthFactor = 1.4;
        this.clickerType = ClickerType.MineClicker;
        this.label = 'Mine';

        this.init();
    }
}

export class HedgefundClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 100;
        this.baseCost = 100000;
        this.costGrowthFactor = 1.5;
        this.clickerType = ClickerType.HedgefundClicker;
        this.label = 'Hedgefund';

        this.init();
    }
}