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
    1: "./Textures/Backgrounds/dirt_background.png",
    2: "./Textures/Backgrounds/stone_background.png",
    3: "./Textures/Backgrounds/rock_background.png",
    4: "./Textures/Backgrounds/lava_background.png"
};

let backgroundNumber = 1;
let currentBackground = backgrounds[backgroundNumber];
// Backgrounds End

document.addEventListener("DOMContentLoaded", () => {

    // Store items Start
    const pickaxe_item = new StoreItem("pickaxe", 100, 1.2);
    const minion_item = new StoreItem("minion", 250, 1.2);
    const minionHut_item = new StoreItem("minion hut", 1000, 1.5);
    const metalDetector_item = new StoreItem("metal detector", 1500, 1.2);
    const machinery_item = new StoreItem("machinery", 2000, 1.8);
    const drill_item = new StoreItem("drill", 10000, 100);

    // Values Start
    let itemsOwned = {
        pickaxeOwned: 0,
        minionOwned: 0,
        minionHutOwned: 0,
        metalDetectorOwned: 0,
        machineryOwned: 0,
        drillOwned: 0
    };

    let oreValues = {
        oreRockValue: 1,
        oreCoalValue: 2,
        oreGoldValue: 10,
        oreMagmaValue: 100
    }

    let oreActive = {
        oreCoalActive: false,
        oreGoldActive: false,
        oreMagmaActive: false
    }
    //Values End

    // Pickaxe Upgrade Start
    pickaxeUpgrade = () => {
        itemsOwned.pickaxeOwned +=1;
        pickaxe_item.price * pickaxe_item.priceMultiplier;
    }
    // Pickaxe Upgrade End

    // Drill Upgrade Start
    drillUpgrade = () => {
        backgroundNumber += 1;

        drill_item.price * drill_item.priceMultiplier

        if (backgroundNumber === 2) {
            oreActive.oreCoalActive = true;
        }
        else if (backgroundNumber === 3) {
            oreActive.oreGoldActive = true;
        }
        else if (backgroundNumber === 4) {
            oreActive.oreMagmaActive = true;
        }
    }
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