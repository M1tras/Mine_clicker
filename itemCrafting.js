import playerInventory from './playerInventory.json' with { type: "json"};

class ItemRecipe {
    //Item price is optional
    itemName = '';
    oresRequired = {};
    itemPrice = 0;

    constructor(itemName, oresRequired) {
        this.itemName = itemName;
        this.oresRequired = oresRequired;
    }

    getOres() {
        console.log(this.oresRequired);
    }
}

const testItem = new ItemRecipe('yes', {iron: 5}, 0);
testItem.checkForOres();

export default ItemRecipe;