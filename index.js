import playerInventory from './Data/playerInventory.json' with { type: "json"};
import oresInGame from './Data/ores.json' with { type: "json" };
import StoreItem from './Components/storeItem.js';

//Spins the ore chance and adds the chosen ore to the players inventory
function spinForOre() {
    let spin = Math.floor(Math.random() * 1000000);

    if (spin >= oresInGame.oresInGame.oreDropChance["oreDiddyum"] && oresInGame.oresInGame.oreDropActive["oreDiddyum"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreDiddyum"] += 1;
    }
    else if (spin >= oresInGame.oresInGame.oreDropChance["oreOil"] && spin < oresInGame.oresInGame.oreDropChance["oreDiddyum"] && oresInGame.oresInGame.oreDropActive["oreOil"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreOil"] += 1;
    }
    else if (spin >= oresInGame.oresInGame.oreDropChance["oreObsidian"] && spin < oresInGame.oresInGame.oreDropChance["oreOil"] && oresInGame.oresInGame.oreDropActive["oreObsidian"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreObsidian"] += 1;
    }
    else if (spin >= oresInGame.oresInGame.oreDropChance["oreDiamond"] && spin < oresInGame.oresInGame.oreDropChance["oreObsidian"] && oresInGame.oresInGame.oreDropActive["oreDiamond"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreDiamond"] += 1;
    }
    else if (spin >= oresInGame.oresInGame.oreDropChance["oreGold"] && spin < oresInGame.oresInGame.oreDropChance["oreDiamond"] && oresInGame.oresInGame.oreDropActive["oreGold"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreGold"] += 1;
    }
    else if (spin >= oresInGame.oresInGame.oreDropChance["oreLithium"] && spin < oresInGame.oresInGame.oreDropChance["oreGold"] && oresInGame.oresInGame.oreDropActive["oreLithium"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreLithium"] += 1;
    }
    else if (spin >= oresInGame.oresInGame.oreDropChance["oreIron"] && spin < oresInGame.oresInGame.oreDropChance["oreLithium"] && oresInGame.oresInGame.oreDropActive["oreIron"] === true) {
        return playerInventory.playerInventory.oresInInventory["oreIron"] += 1;
    }
    else {
        return playerInventory.playerInventory.oresInInventory["oreCoal"] += 1;
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

function resetGameHandler() {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

window.resetGame = resetGameHandler;

document.addEventListener("DOMContentLoaded", () => {

    // Store items
    const storeItems = [
        new StoreItem("pickaxe", 25, 1.1, 1, "./Textures/Icons/pickaxe.png"),
        new StoreItem("miner", 500, 1.1, 0, "./Textures/Icons/worker.png"),
        new StoreItem("drill", 10000, 2, 0, "./Textures/Icons/drill.png"),
        new StoreItem("miner hut", 2000, 3, 0, "./Textures/Icons/hut.png")
    ];

    const DRILL_MULT = 0.5;
    let selectedItemIndex = 0;
    let itemsOwned = {};
    storeItems.forEach(i => itemsOwned[i.name] = 0);

    // Rock clicker
    let count = document.getElementById("rock");
    let counting = document.getElementById("counting");
    let rocks = Number(localStorage.getItem("rock")) || 0;

    displayRocksAmt();
    if (count) count.addEventListener("click", RockClicked);

    function getGlobalMultiplier() {
        const drillCount = itemsOwned['drill'] || 0;
        return 1 + drillCount * DRILL_MULT;
    }

    function RockClicked() {
        let perClickBonus = 0;
        storeItems.forEach(item => {
            const count = itemsOwned[item.name] || 0;
            perClickBonus += count * item.getPerClick();
        });

        const gained = (1 + perClickBonus) * getGlobalMultiplier();
        rocks += gained;

        saveGame();
        displayRocksAmt();
    }

    function displayRocksAmt() {
        if (counting) counting.innerText = Math.floor(rocks);
    }

    // grid start //
    const storeGridEl = document.querySelector(".store-grid");

    function renderStoreGrid() {
        if (!storeGridEl) return;
        storeGridEl.innerHTML = "";
        
        storeItems.forEach((item, index) => {
            const cardFragment = createStoreCard(item, index);
            storeGridEl.appendChild(cardFragment);
        });
    }

    function createStoreCard(item, index) {
        const template = document.getElementById('store-card-template');
        const card = template.content.cloneNode(true);
        const div = card.querySelector('.store-card');
        
        const ownedCount = itemsOwned[item.name] || 0;
        
        div.dataset.index = index;
        card.querySelector('.store-icon').src = item.getIcon();
        card.querySelector('.store-item-name').textContent = item.getName();
        card.querySelector('.store-item-owned').textContent = `Owned: ${ownedCount}`;
        card.querySelector('.card-buy').dataset.index = index;
        card.querySelector('.card-buy').textContent = `Buy (${item.getPrice()})`;
        
        const clickbonus = card.querySelector(".click-bonus");
        const productionInfo = card.querySelector('.production-info');
        const drillInfo = card.querySelector('.drill-info');
        const minerHutInfo = card.querySelector('.miner-hut-info');

        if (item.getName() === "pickaxe") {
            clickbonus.textContent = `+${item.getPerClick()} per click`;
        } else {
            clickbonus.style.display = 'none';
        }

        if (item.getName() === "miner") {
            productionInfo.textContent = `Produces: ${ownedCount * 10} rocks/sec`;
        } else {
            productionInfo.style.display = 'none';
        }
        
        if (item.getName() === "drill") {
            const percentBonus = (DRILL_MULT * 100).toFixed(0);
            const totalMultiplier = (1 + ownedCount * DRILL_MULT).toFixed(2);
            drillInfo.textContent = `Each drill: +${percentBonus}% to rocks. Current: ×${totalMultiplier}`;
        } else {
            drillInfo.style.display = 'none';
        }
        
        if (item.getName() === "miner hut") {
            const MAX_MINERS = 10 + (ownedCount * 10);
            minerHutInfo.textContent = `Allows up to ${MAX_MINERS} miners`;
        } else {
            minerHutInfo.style.display = 'none';
        }
        
        return card;
    }

    //  buy stuff from store
    if (storeGridEl) {
        storeGridEl.addEventListener('click', e => {
            const buyBtn = e.target.closest('.card-buy');
            if (!buyBtn) return;
            purchaseItem(Number(buyBtn.dataset.index));
        });
    }

    function purchaseItem(idx) {
        const item = storeItems[idx];
        if (!item) return;

        if (!item.itemBuyCheck(rocks)) {
            alert('Not enough rocks!');
            return;
        }

        if (item.getName() === 'miner') {
            const maxMiners = 10 + (itemsOwned['miner hut'] || 0) * 10;
            if (itemsOwned['miner'] >= maxMiners) {
                alert(`You can only own up to ${maxMiners} miners! Buy miner huts to increase the limit.`);
                return;
            }
        }

        rocks = item.itemBuy(rocks);
        itemsOwned[item.name] = (itemsOwned[item.name] || 0) + 1;
        item.addMultiplier();

        if (item.getName() === 'drill') advanceBackground();

        saveGame();
        displayRocksAmt();
        renderStoreGrid();
        updateShopUI();
    }

// grid end //

    function advanceBackground() {
        const maxBg = Math.max(...Object.keys(backgrounds).map(n => Number(n)));
        if (backgroundNumber >= maxBg) return;
        backgroundNumber += 1;
        currentBackground = backgrounds[backgroundNumber];
        applyBackground(true);
    }

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
            try { localStorage.removeItem('pickaxePrice'); } catch (e) {}
        }
    }

    function updateShopUI() {
        const item = storeItems[selectedItemIndex];
        const owned = itemsOwned[item.name] || 0;
        const prod = item.getName() === 'miner' ? ` — Produces: ${owned} rock${owned === 1 ? '' : 's'}/sec` : '';
        const drillInfo = item.getName() === 'drill' ? ` — All income ×${(1 + owned * DRILL_MULT).toFixed(2)}` : '';

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

    loadGame();
    updateShopUI();
    applyBackground(false);

    const minerProductionRate = 10;
    function rocksPerSecond() { return (itemsOwned['miner'] || 0) * minerProductionRate; }

    setInterval(() => {
        const totalIncome = rocksPerSecond() * getGlobalMultiplier();
        if (totalIncome > 0) { rocks += totalIncome; saveGame(); displayRocksAmt(); }
    }, 1000);
});
