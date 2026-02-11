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
    itemBuyCheck (count) {
        if (count < this.price) {
            return 'Not enough rocks!';
        }
    }
    itemBuy (count) {
        return count -= this.price;
    }
}

/* Icons Start */
const slave_icon = 'placeholder';
/* Icons End */

document.addEventListener("DOMContentLoaded", () => {
    let count = Number(localStorage.getItem("count")) || 0;

    /* Store items Start*/
    const slave = new StoreItem("slave", 100, )
    /* Store items End*/

    const button = document.getElementById("button");
    const display = document.getElementById("counting");

    display.textContent = count;

    button.addEventListener("click", () => {
        count++;
        display.textContent = count;
        localStorage.setItem("count", count);
    });
});