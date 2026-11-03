import ItemRecipe from "./itemCrafting";

/* Siia tulevad crafting asjad

Näide: 
    const buffItem = new ItemRecipe(itemName, {"ore1": how much, "ore2": how much}, price: how much);

Note: ore nimi peab olema sama, mis neil on playerInventory.json failis. Nagu "oreStone" ja "oreGold". Price on ka valikuline.
*/

const lavaproofArmor = new ItemRecipe(
    "Lavaproof Armor",
    {"oreStone": 5, "oreGold": 2},
    100,
    'Gives workers the ability to work in hot temperature areas'
);

