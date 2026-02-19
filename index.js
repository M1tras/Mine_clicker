import StoreItem from './storeItem.js';

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
        // miner gives passive income only
        new StoreItem("miner", 500, 1.1, 0, "./Textures/Icons/worker.png"),
        // drill grants a click multiplier instead of a flat per-click bonus
        new StoreItem("drill", 2000, 2, 0, "./Textures/Icons/drill.png"),
    ];

    // additive click multiplier per drill owned
    const DRILL_MULT = 0.5;

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

    /**
     * Global multiplier from multiplier-type items (drill currently provides this).
     * Future items can add to this by setting a `globalMultiplier` property.
     */
    function getGlobalMultiplier() {
        const drillCount = itemsOwned['drill'] || 0;
        return 1 + drillCount * DRILL_MULT;
    }

    function RockClicked() {
        // flat per-click bonus from items (exclude miners & multiplier-only items)
        let perClickBonus = 0;
        storeItems.forEach(item => {
            if (item.name === 'miner' || item.name === 'drill') return; // miners are passive; drills are multiplier-only
            const count = itemsOwned[item.name] || 0;
            perClickBonus += count * item.perClick;
        });

        // apply global multiplier (drill affects ALL rock income now)
        const gained = (1 + perClickBonus) * getGlobalMultiplier();
        rocks += gained;

        saveGame();
        displayRocksAmt();
    }

    function displayRocksAmt() {
        if (counting) counting.innerText = Math.floor(rocks);
    }

 
    // STORE - render grid and handle Buy action
    const storeGridEl = document.querySelector(".store-grid");

    function renderStoreGrid() {
        if (!storeGridEl) return;
        storeGridEl.innerHTML = storeItems.map((item, idx) => {
            const owned = itemsOwned[item.name] || 0;
            const productionLine = item.name === 'miner' ? `<p class="store-item-pps">Produces: ${owned * 10} rocks/sec</p>` : '';
            const drillLine = item.name === 'drill' && owned > 0
                ? `<p class="store-item-pps">Each drill: +${(DRILL_MULT * 100).toFixed(0)}% to ALL rock income — Total ×${(1 + owned * DRILL_MULT).toFixed(2)}</p>`
                : ''; 

            return `
            <div class="store-card" data-index="${idx}">
                <img class="store-icon" src="${item.getIcon() || './Textures/Icons/pickaxe.png'}" alt="${item.getName()}">
                <div class="store-info">
                    <h3 class="store-item-name">${item.getName()}</h3>
                    <p class="store-item-owned">Owned: ${owned}</p>
                    ${productionLine}${drillLine}
                    <button class="card-buy" data-index="${idx}">Buy (${item.getPrice()})</button>
                </div>
            </div>
        `;
        }).join('');
    }

    // delegated click handler — handle Buy clicks via a single helper
    if (storeGridEl) {
        storeGridEl.addEventListener('click', e => {
            const buyBtn = e.target.closest('.card-buy');
            if (!buyBtn) return;
            purchaseItem(Number(buyBtn.dataset.index));
        });
    }

    /** Centralized purchase logic used by grid (and future UI controls). */
    function purchaseItem(idx) {
        const item = storeItems[idx];
        if (!item) return;
        if (!item.itemBuyCheck(rocks)) { alert('Not enough rocks!'); return; }

        rocks = item.itemBuy(rocks);
        itemsOwned[item.name] = (itemsOwned[item.name] || 0) + 1;
        item.addMultiplier();

        if (item.name === 'drill') advanceBackground();

        saveGame();
        displayRocksAmt();
        renderStoreGrid();
        updateShopUI();
    }

    /** Advance background by one step (clamped). */
    function advanceBackground() {
        const maxBg = Math.max(...Object.keys(backgrounds).map(n => Number(n)));
        if (backgroundNumber >= maxBg) return;
        backgroundNumber += 1;
        currentBackground = backgrounds[backgroundNumber];
        applyBackground(true);
    }

    // SAVE/LOAD — concise and robust
    function saveGame() {
        localStorage.setItem('rock', String(rocks));
        localStorage.setItem('itemsOwned', JSON.stringify(itemsOwned));
        localStorage.setItem('backgroundNumber', String(backgroundNumber));
        localStorage.setItem('itemPrices', JSON.stringify(Object.fromEntries(storeItems.map(i => [i.name, i.price]))));
    }

    function loadGame() {
        try {
            const savedItems = JSON.parse(localStorage.getItem('itemsOwned') || 'null');
            const savedPrices = JSON.parse(localStorage.getItem('itemPrices') || 'null');
            const savedBg = Number(localStorage.getItem('backgroundNumber'));

            if (savedItems && typeof savedItems === 'object') {
                Object.keys(itemsOwned).forEach(k => { if (savedItems[k] !== undefined) itemsOwned[k] = savedItems[k]; });
            }

            if (savedPrices && typeof savedPrices === 'object') {
                storeItems.forEach(i => { if (savedPrices[i.name] !== undefined) i.price = savedPrices[i.name]; });
            }

            if (!isNaN(savedBg) && backgrounds[savedBg]) {
                backgroundNumber = savedBg;
                currentBackground = backgrounds[backgroundNumber];
            }
        } catch (err) {
            console.warn('Failed to load saved game — starting fresh', err);
        } finally {
            try { localStorage.removeItem('pickaxePrice'); } catch (e) { /* ignore */ }
        }
    }

    // SHOP UI UPDATE — smaller, clearer
    function updateShopUI() {
        const item = storeItems[selectedItemIndex];
        const owned = itemsOwned[item.name] || 0;
        const prod = item.name === 'miner' ? ` — Produces: ${owned} rock${owned === 1 ? '' : 's'}/sec` : '';
        const drillInfo = item.name === 'drill' ? ` — All income ×${(1 + owned * DRILL_MULT).toFixed(2)}` : '';

        const storeItemNameEl = document.querySelector('.store-item-name');
        const storeItemOwnedEl = document.querySelector('.store-item-owned');
        const storeBuyBtn = document.querySelector('.store-buy');
        const storeIconEl = document.querySelector('.store-icon');

        if (storeItemNameEl) storeItemNameEl.textContent = item.getName();
        if (storeItemOwnedEl) storeItemOwnedEl.textContent = `Owned: ${owned}${prod}${drillInfo}`;
        if (storeBuyBtn) storeBuyBtn.textContent = `Buy (${item.getPrice()})`;
        if (storeIconEl) storeIconEl.src = item.getIcon() || './Textures/Icons/pickaxe.png';

        renderStoreGrid();
    }

    /** Apply the current background image (cross-fade). Cleaner listener using `once`. */
    function applyBackground(doFade = true) {
        const mainEl = document.getElementById('main-page');
        if (!mainEl) return;
        const url = backgrounds[backgroundNumber] || backgrounds[1];

        let fader = mainEl.querySelector('.bg-fader');
        if (!fader) { fader = document.createElement('div'); fader.className = 'bg-fader'; mainEl.appendChild(fader); }

        if (!doFade) {
            mainEl.style.background = `url('${url}') no-repeat center center/cover`;
            fader.style.opacity = '0';
            fader.style.backgroundImage = '';
            return;
        }

        fader.style.backgroundImage = `url('${url}')`;
        void fader.offsetWidth; // force layout
        fader.style.opacity = '1';

        fader.addEventListener('transitionend', () => {
            mainEl.style.background = `url('${url}') no-repeat center center/cover`;
            fader.style.opacity = '0';
            setTimeout(() => { fader.style.backgroundImage = ''; }, 700);
        }, { once: true });
    }

    // INIT

    loadGame();
    updateShopUI();
    applyBackground(false);

    // Passive income: miners produce rocks every second
    const minerProductionRate = 10;
    function rocksPerSecond() { return (itemsOwned['miner'] || 0) * minerProductionRate; }

    setInterval(() => {
        const totalIncome = rocksPerSecond() * getGlobalMultiplier();
        if (totalIncome > 0) { rocks += totalIncome; saveGame(); displayRocksAmt(); }
    }, 1000);
});
