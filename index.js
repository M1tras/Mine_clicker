class StoreItem {
    name = 'placeholder: Name';
    price = 0;
    icon = 'placeholder: icon';

    constructor(name, price, icon) {
        this.name = name;
        this.price = price;
        this.icon = icon;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getIcon() {
        return this.icon;
    }
    itemBuyCheck(rocks) {
        if (rocks < this.price) {
            return 'Not enough rocks!';
        }
        return 'Can buy';
    }
    itemBuy(rocks) {
        return rocks - this.price;
    }
}

/* Icons Start */
const slave_icon = 'placeholder';
/* Icons End */

document.addEventListener("DOMContentLoaded", () => {
    /* Store items Start */
    const slave = new StoreItem("slave", 100, slave_icon);
    /* Store items End */

    // Rock clicker system
    let count = document.getElementById("rock");
    let displayrocks = document.getElementById("displayrocks");
    let upgradeClicker = document.getElementById("upgClicker");
    let displayUpgradeCost = document.getElementById("displayUpgradeCost");
    let counting = document.getElementById("counting");

    count.addEventListener("click", RockClicked);
    upgradeClicker.addEventListener("click", upgradeClickerClicked);

    let rocks = 0;
    let multiplier = 1;
    let multiplierCost = 25;

    function RockClicked() {
        rocks += multiplier;
        displayRocksAmt();
    }

    function displayRocksAmt() {
        displayrocks.innerHTML = "You have " + rocks + " rocks";
        counting.innerText = rocks;
    }

    function upgradeClickerClicked() {
        if (rocks >= multiplierCost) {
            rocks -= multiplierCost;
            multiplier= 2;
            multiplierCost = Math.floor(multiplierCost * 1.3);
            displayUpgradeCost.innerHTML = "Upgrade costs " + multiplierCost + " rocks";
            displayRocksAmt();
        } else {
            alert("Not enough rocks");
        }
    }
});