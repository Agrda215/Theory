import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "custom";
var name = "Tratrin Theory";
var description = "owowowowowowo";
var authors = "Agrda215";
var version = 1;

var currency;

var init = () => {
    currency1 = theory.createCurrency();
    currency2 = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // v1
    {
        let getDesc = (level) => "v_1=" + getV1(level).toString(0);
        v1 = theory.createUpgrade(0, currency1, new FirstFreeCost(new ExponentialCost(5, Math.log2(2))));
        v1.getDescription = (_) => Utils.getMath(getDesc(v1.level));
        v1.getInfo = (amount) => Utils.getMathTo(getDesc(v1.level), getDesc(v1.level + amount));
    }
}

var getTau = () => currency1.value;

var getV1 = (level) => Utils.getStepwisePowerSum(level, 5.5, 8, 0);

init();
