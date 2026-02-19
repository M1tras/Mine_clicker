import playerInventory from '../Data/playerInventory.json' with { type: "json"};

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

    //Checks if player has enough of crafting materials. Returns true if the player does and false if the player doesn't
    checkForOres() {
        const countOres = Object.keys(this.oresRequired);
        let checkAnswer = false;

        for (let i = 0; i < countOres.length; i++) {
            if (countOres[i] in playerInventory.playerInventory.oresInInventory) {
                if (this.oresRequired[countOres[i]] >= playerInventory.playerInventory.oresInInventory[countOres[i]]) {
                    checkAnswer = true;
                }
                else {
                    checkAnswer = false;
                    break
                }
            }
            else {
                console.log(`Error: Ore(${countOres[i]}) does not exist in game`);
            }
        }
        return checkAnswer;
    }

    
}

export default ItemRecipe;