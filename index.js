class StoreItem {
    name = 'placeholder: Name';
    price = 0;

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    itemBuyCheck(rocks) {
        if (rocks < this.price) {
            return 'Not enough rocks!';
        }
    }

    itemBuy(rocks) {
        return rocks - this.price;
    }
}

/* Backgrounds */
const background_1 = "./Textures/Backgrounds/dirt_background.png";
const background_2 = "./Textures/Backgrounds/stone_background.png";
const background_3 = "./Textures/Backgrounds/rock_background.png";
const background_4 = "./Textures/Backgrounds/lava_background.png";
/* Backgrounds */

/* Store items Start */
const slave = new StoreItem("pickaxe", 100);
/* Store items End */

document.addEventListener("DOMContentLoaded", () => {
    // Rock clicker system
    let count = document.getElementById("rock");
    let displayrocks = document.getElementById("displayrocks");
    let counting = document.getElementById("counting");
    let rocks = Number(localStorage.getItem("rock")) || 0;

    displayRocksAmt();
    if (count) count.addEventListener("click", RockClicked);

    function RockClicked() {
        rocks ++;
        localStorage.setItem("rock", rocks);
        displayRocksAmt();
    }

    function displayRocksAmt() {
        if (displayrocks) displayrocks.innerHTML = "You have " + rocks + " rocks";
        if (counting) counting.innerText = rocks;
    }
});

