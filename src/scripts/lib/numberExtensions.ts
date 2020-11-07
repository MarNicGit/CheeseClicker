declare interface Number {
    toPretty(short?:boolean): string;
}



/**
 * Return the number, rounded, with long unit behind it
 */
Number.prototype.toPretty = function (this: number, short: boolean = false): string {
    let unitsLong = [ //yanked off wikipedia
        {value: 1, label: '', symbol: ''},
        {value: 1E3, label: 'Thousand', symbol: 'K'},
        {value: 1E6, label: 'Million', symbol: 'M'},
        {value: 1E9, label: 'Billion', symbol: 'B'},
        {value: 1E12, label: 'Trillion', symbol: 'T'},
        {value: 1E15, label: 'Quadrillion', symbol: 'Qd'},
        {value: 1E18, label: 'Quintillion', symbol: 'Qt'},
        {value: 1E21, label: 'Sextillion', symbol: 'Sx'},
        {value: 1E24, label: 'Septillion', symbol: 'Sp'},
        {value: 1E27, label: 'Octillion', symbol: 'O'},
        {value: 1E30, label: 'Nonillion', symbol: 'N'},
        {value: 1E33, label: 'Decillion', symbol: 'Dc'},
        {value: 1E36, label: 'Undecillion', symbol: 'Ud'},
        {value: 1E39, label: 'Duodecillion', symbol: 'Dd'},
        {value: 1E42, label: 'Tredecillion', symbol: 'Td'},
        {value: 1E45, label: 'Quattuordecillion', symbol: 'Qtd'},
        {value: 1E48, label: 'Quindecillion', symbol: 'Qnd'},
        {value: 1E51, label: 'Sexdecillion', symbol: 'Sd'},
        {value: 1E54, label: 'Septendecillion', symbol: 'Spd'},
        {value: 1E57, label: 'Octodecillion', symbol: 'Od'},
        {value: 1E60, label: 'Novemdecillion', symbol: 'Nd'},
        {value: 1E63, label: 'Vigintillion', symbol: 'Vt'}
    ];

    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    let selectedUnit;
    for (const [i,unit] of unitsLong.entries()) {
        selectedUnit = unit;

        if(unitsLong[i+1]){
            if(this < unitsLong[i+1].value ){
                break;
            }
        }else{
            break;
        }
    }

    return `${(this / selectedUnit.value).toFixed(2)}${short?selectedUnit.symbol:` ${selectedUnit.label}`}`;
}
