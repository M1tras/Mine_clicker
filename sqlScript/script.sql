-- Users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(50) NOT NULL
);

-- Ores (definitions)
CREATE TABLE ores (
    ore_id INT AUTO_INCREMENT PRIMARY KEY,
    ore_name VARCHAR(50) NOT NULL,
    ore_rarity INT NOT NULL,
    ore_stage_gotten INT NOT NULL
);

-- Items (definitions)
CREATE TABLE items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL
);

-- Buffs (definitions)
CREATE TABLE buffs (
    buff_id INT AUTO_INCREMENT PRIMARY KEY,
    buff_name VARCHAR(50) NOT NULL
);

-- Inventory: Ores
CREATE TABLE inventory_ores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ore_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (ore_id) REFERENCES ores(ore_id) ON DELETE CASCADE,
    UNIQUE (user_id, ore_id)
);

-- Inventory: Items
CREATE TABLE inventory_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE,
    UNIQUE (user_id, item_id)
);

-- Inventory: Buffs
CREATE TABLE inventory_buffs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    buff_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (buff_id) REFERENCES buffs(buff_id) ON DELETE CASCADE,
    UNIQUE (user_id, buff_id)
);

-- ============================ --
-- ======= Adding Stats ======= --
-- ============================ --

-- Ores (stats)
INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreCoal, 300, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreIron, 100, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreLithium, 50, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreGold, 20, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreDiamond, 10, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreObsidian, 5, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreOil, 3, 0);

INSERT INTO Ores (ore_name, ore_rarity, ore_stage_gotten)
VALUES (oreDiddyum, 1, 0);