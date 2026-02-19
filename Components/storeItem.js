class StoreItem {
    name = 'placeholder: Name';
    price = 0;
    priceMultiplier = 0;
    perClick = 0;
    icon = '';

    constructor(name, price, priceMultiplier, perClick = 0, icon = '') {
        this.name = name;
        this.price = price;
        this.priceMultiplier = priceMultiplier;
        this.perClick = perClick;
        this.icon = icon;
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
    getPerClick() {
        return this.perClick;
    }
    getIcon() {
        return this.icon;
    }

    itemBuyCheck(rocks) {
        return rocks >= this.price;
    }
    itemBuy(rocks) {
        return rocks - this.price;
    }
    addMultiplier() {
        this.price *= this.priceMultiplier;
        return this.price;
    }
}

export default StoreItem;