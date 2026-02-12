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
    }

    itemBuy(rocks) {
        return rocks - this.price;
    }
}

/* Icons Start */
const slave_icon = 'placeholder';
/* Icons End */

/* Store items Start */
const slave = new StoreItem("slave", 100, slave_icon);
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

