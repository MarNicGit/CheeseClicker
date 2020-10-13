import { Game } from "../../game";
import { ClickerType } from "../../enums";
import { ClickerBase } from "./_clickerBase";

export class AutoClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 0.1;
        this.baseCost = 10;
        this.costGrowthFactor = 1.1;
        this.clickerType = ClickerType.AutoClicker;

        this.init();
    }
}

export class KiloClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 1;
        this.baseCost = 100;
        this.costGrowthFactor = 1.2;
        this.clickerType = ClickerType.KiloClicker;

        this.init();
    }
}

export class MegaClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 1;
        this.baseCost = 1500;
        this.costGrowthFactor = 1.3;
        this.clickerType = ClickerType.MegaClicker;

        this.init();
    }
}

export class GigaClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 2;
        this.baseCost = 10000;
        this.costGrowthFactor = 1.4;
        this.clickerType = ClickerType.GigaClicker;

        this.init();
    }
}

export class TeraClicker extends ClickerBase{

    constructor(public game:Game){
        super(game);
        this.baseIncrement = 3;
        this.baseCost = 100000;
        this.costGrowthFactor = 1.5;
        this.clickerType = ClickerType.TeraClicker;

        this.init();
    }
}