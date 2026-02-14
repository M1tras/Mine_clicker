class StoreItem {
    name = 'placeholder: Name';
    price = 0;
    priceMultiplier = 0;

    constructor(name, price, priceMultiplier) {
        this.name = name;
        this.price = price;
        this.priceMultiplier = priceMultiplier;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price.toFixed(0);
    }

    getPriceMultiplier() {
        return this.priceMultiplier;
    }

    itemBuyCheck(rocks) {
        if (rocks < this.price) {
            return 'Not enough rocks!';
        }
    }

    itemBuy(rocks) {
        return rocks - this.price;
    }

    addMultiplier() {
        this.price *= this.priceMultiplier;
        return this.price;
    }
}

// Backgrounds Start
const backgrounds = {
    background_1: "./Textures/Backgrounds/dirt_background.png",
    background_2: "./Textures/Backgrounds/stone_background.png",
    background_3: "./Textures/Backgrounds/rock_background.png",
    background_4: "./Textures/Backgrounds/lava_background.png"
};
// Backgrounds End

document.addEventListener("DOMContentLoaded", () => {

    // Store items Start
    const pickaxe_item = new StoreItem("pickaxe", 100, 1.2);
    const minion_item = new StoreItem("minion", 250, 1.2);
    const minionHut_item = new StoreItem("minion hut", 1000, 1.5);
    const metalDetector_item = new StoreItem("metal detector", 1500, 1.2);
    const machinery_item = new StoreItem("machinery", 2000, 1.8);
    const drill_item = new StoreItem("drill", 10000, 2);


    let itemsOwned = {
        pickaxeOwned: 4,
        minionOwned: 0,
        minionHutOwned: 0,
        metalDetectorOwned: 0,
        machineryOwned: 0,
        drillOwned: 0
    };

    // Pickaxe Upgrade Start
    pickaxeUpgrade = () => {
        itemsOwned.pickaxeOwned +=1;
        pickaxe_item.price * 1.2;
    }
    // Pickaxe Upgrade End

    // Drill Upgrade Start
    // Drill Upgrade End

    // Store items End 

    // Rock clicker system
    let count = document.getElementById("rock");
    let displayrocks = document.getElementById("displayrocks");
    let counting = document.getElementById("counting");
    let rocks = Number(localStorage.getItem("rock")) || 0;

    displayRocksAmt();
    if (count) count.addEventListener("click", RockClicked);

    function RockClicked() {
        if (itemsOwned.pickaxeOwned > 0) {
            rocks += (1 + itemsOwned.pickaxeOwned);
        }
        else {
            rocks ++;
        }
        localStorage.setItem("rock", rocks);
        displayRocksAmt();
    }

    function displayRocksAmt() {
        if (displayrocks) displayrocks.innerHTML = "You have " + rocks + " rocks";
        if (counting) counting.innerText = rocks;
    }
});

