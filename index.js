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

    getName() { return this.name; }
    getPrice() { return this.price.toFixed(0); }
    getPriceMultiplier() { return this.priceMultiplier; }
    getPerClick() { return this.perClick; }
    getIcon() { return this.icon; }

    itemBuyCheck(rocks) { return rocks >= this.price; }
    itemBuy(rocks) { return rocks - this.price; }
    addMultiplier() { this.price *= this.priceMultiplier; return this.price; }
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

    // Store items
    // multiple store items (name, price, multiplier, perClick, icon)
    const storeItems = [
        new StoreItem("pickaxe", 100, 1.2, 1, "./Textures/Icons/pickaxe.png"),
        new StoreItem("miner", 500, 1.25, 5, "./Textures/Icons/worker.png"),
        new StoreItem("drill", 2000, 1.5, 20, "./Textures/Icons/drill.png"),
    ];

    let selectedItemIndex = 0;

    let itemsOwned = {};
    storeItems.forEach(i => itemsOwned[i.name] = 0);

  
    // Rock clicker

    let count = document.getElementById("rock");
    let counting = document.getElementById("counting");
    let rocks = Number(localStorage.getItem("rock")) || 0;

    displayRocksAmt();

    if (count) {
        count.addEventListener("click", RockClicked);
    }

    function RockClicked() {
        let perClickBonus = 0;
        storeItems.forEach(item => {
            const count = itemsOwned[item.name] || 0;
            perClickBonus += count * item.perClick;
        });

        rocks += 1 + perClickBonus;

        saveGame();
        displayRocksAmt();
    }

    function displayRocksAmt() {
        if (counting) counting.innerText = Math.floor(rocks);
    }

 
    // STORE - render grid and handle Buy action only
    const storeGridEl = document.querySelector(".store-grid");

    function renderStoreGrid() {
        if (!storeGridEl) return;
        storeGridEl.innerHTML = storeItems.map((item, idx) => `
            <div class="store-card" data-index="${idx}">
                <img class="store-icon" src="${item.getIcon() || './Textures/Icons/pickaxe.png'}" alt="${item.getName()}">
                <div class="store-info">
                    <h3 class="store-item-name">${item.getName()}</h3>
                    <p class="store-item-owned">Owned: ${itemsOwned[item.name] || 0}</p>
                    <button class="card-buy" data-index="${idx}">Buy (${item.getPrice()})</button>
                </div>
            </div>
        `).join('');
    }

    // delegated click handler — only handle Buy clicks (no selection)
    if (storeGridEl) {
        storeGridEl.addEventListener('click', (e) => {
            const buyBtn = e.target.closest('.card-buy');
            if (!buyBtn) return; // ignore non-buy clicks

            const idx = Number(buyBtn.dataset.index);
            const item = storeItems[idx];
            if (!item.itemBuyCheck(rocks)) { alert('Not enough rocks!'); return; }

            rocks = item.itemBuy(rocks);
            itemsOwned[item.name] = (itemsOwned[item.name] || 0) + 1;
            item.addMultiplier();

            saveGame();
            displayRocksAmt();
            renderStoreGrid();
        });
    }

   
    // SAVE/LOAD


    function saveGame() {
        localStorage.setItem("rock", rocks);
        localStorage.setItem("itemsOwned", JSON.stringify(itemsOwned));
        const prices = {};
        storeItems.forEach(i => prices[i.name] = i.price);
        localStorage.setItem("itemPrices", JSON.stringify(prices));
    }

    function loadGame() {
        const savedItems = JSON.parse(localStorage.getItem("itemsOwned"));
        const savedPrices = JSON.parse(localStorage.getItem("itemPrices"));

        if (savedItems) {
            Object.keys(itemsOwned).forEach(k => {
                if (savedItems[k] !== undefined) itemsOwned[k] = savedItems[k];
            });
        }

        if (savedPrices) {
            storeItems.forEach(i => {
                if (savedPrices[i.name] !== undefined) i.price = savedPrices[i.name];
            });
        }

        try { localStorage.removeItem("pickaxePrice"); } catch (e) { /* ignore */ }
    }

    // SHOP UI UPDATE

    function updateShopUI() {
        const item = storeItems[selectedItemIndex];

        // update single-card UI
        const storeItemNameEl = document.querySelector('.store-item-name');
        const storeItemOwnedEl = document.querySelector('.store-item-owned');
        const storeBuyBtn = document.querySelector('.store-buy');
        const storeIconEl = document.querySelector('.store-icon');

        if (storeItemNameEl) storeItemNameEl.innerText = item.getName();
        if (storeItemOwnedEl) storeItemOwnedEl.innerText = 'Owned: ' + (itemsOwned[item.name] || 0);
        if (storeBuyBtn) storeBuyBtn.innerText = 'Buy (' + item.getPrice() + ')';
        if (storeIconEl) storeIconEl.src = item.getIcon() || './Textures/Icons/pickaxe.png';

        // re-render grid
        if (typeof renderStoreGrid === 'function') renderStoreGrid();
    }

    // INIT

    loadGame();
    updateShopUI();
});
