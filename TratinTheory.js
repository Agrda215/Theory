import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "custom";
var name = "Tratrin Theory";
var description = "An implementation of... what? everything you buy will only works while offline";
var authors = "Agrda215";
var version = 1;

var currency;

var init = () => {
    currency1 = theory.createCurrency();
    currency2 = theory.createCurrency();
}

init();