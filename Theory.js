import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "theory";
var name = "My Theory";
var description = "116616661";
var authors = "Sky == liver";
var version = 1;

var currency;
var a1, a2, a3, a4;

var achievement1, achievement2, achievement3;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // a1
    {
        let getDesc = (level) => "a_1=" + getA1(level).toString(0);
        a1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(2.1))));
        a1.getDescription = (_) => Utils.getMath(getDesc(a1.level));
        a1.getInfo = (amount) => Utils.getMathTo(getDesc(a1.level), getDesc(a1.level + amount));
    }

    // a2
    {
        let getDesc = (level) => "a_2=" + getA2(level).toString(0);
        a2 = theory.createUpgrade(1, currency, new FirstFreeCost(new ExponentialCost(20, Math.log2(2.1))));
        a2.getDescription = (_) => Utils.getMath(getDesc(a2.level));
        a2.getInfo = (amount) => Utils.getMathTo(getDesc(a2.level), getDesc(a2.level + amount));
    }

    // a3
    {
        let getDesc = (level) => "a_3=" + getA3(level).toString(0);
        a3 = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(5e4, Math.log2(15))));
        a3.getDescription = (_) => Utils.getMath(getDesc(a3.level));
        a3.getInfo = (amount) => Utils.getMathTo(getDesc(a3.level), getDesc(a3.level + amount));
    }

    // a4
    {
        let getDesc = (level) => "a_4=" + getA4(level).toString(0);
        a4 = theory.createUpgrade(3, currency, new FirstFreeCost(new ExponentialCost(5e9, Math.log2(15))));
        a4.getDescription = (_) => Utils.getMath(getDesc(a4.level));
        a4.getInfo = (amount) => Utils.getMathTo(getDesc(a4.level), getDesc(a4.level + amount));
    }

    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "wowoowoow", "played", () => true);
    achievement2 = theory.createAchievement(1, "can", "not played?", () => false);
    achievement3 = theory.createSecretAchievement(1, "quot", "Det", "lolola", () => a2.level > 0);

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e12);
    theory.createBuyAllUpgrade(1, currency, 1e17);
    theory.createAutoBuyerUpgrade(2, currency, 1e22);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getA1(a1.level).sqrt() * getA2(a2.level) * (getA3(a3.level).pow(0.9) + BigNumber.ONE) * getA4(a4.level)
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = \\sqrt{a_1}";

    result += "a_2";

    result += "((a_3^{0.9})+1)";

    result += "a_4";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho^{0.69}";
var getPublicationMultiplier = (tau) => tau.pow(0.166) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.166}}{3}";
var getTau = () => currency.value.pow(0.69);

var getA1 = (level) => Utils.getStepwisePowerSum(level, 3, 5, 0);
var getA2 = (level) => Utils.getStepwisePowerSum(level, 3, 5, 0);
var getA3 = (level) => Utils.getStepwisePowerSum(level, 3, 5, 0);
var getA4 = (level) => Utils.getStepwisePowerSum(level, 3, 5, 0);

init();