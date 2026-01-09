/**
 * ISEP Tycoon - Game Logic
 */

// -- Config --
var GLOBAL_MULTIPLIER = 1.0;
var INCOME_PER_STUDENT = 0.2;
var TICK_RATE = 1000;
var STUDENT_UPDATE_INTERVAL = 5000;

var COMP_ID = "C4EE32689A47AB45842BDB0D0E7EC980";

// -- Game State --
var gameState = {
    money: 1000,
    students: 0,
    sustainability: 0,
    buildings: {}
};

var buildingsData = null;

// UI refs
var uiInstance = null;
var upgradePanel = null;
var alertPanel = null;
var hoverInstance = null;
var currentOpenBuildingId = null;
var isHoveringLocked = false;

var gameTickInterval = null;
var lastStudentUpdateTime = 0;
var currentStudentDelta = 0;
var alunosInfoInstance = null;

// Save system
var SAVE_KEY = "isep_tycoon_save";
var AUTO_SAVE_INTERVAL = 15000;
var autoSaveIntervalId = null;
var isLoadingGame = false;
var isHoveringUI = false;

// Audio
var soundtrackFiles = [
    "assets/soundtrack/Soundtrack_1.mp3",
    "assets/soundtrack/Soundtrack_2.mp3",
    "assets/soundtrack/Soundtrack_3.mp3"
];
var lastPlayedTrack = -1;
var soundtrackInstance = null;
var SOUNDTRACK_VOLUME = 0.02;
var SFX_VOLUME = 0.2;
var themeSongStarted = false;

function getLib() {
    if (window.lib) return window.lib;
    if (typeof AdobeAn !== 'undefined') {
        var comp = AdobeAn.getComposition(COMP_ID);
        if (comp) return comp.getLibrary();
    }
    return null;
}

// -- Init --
var menuInstance = null;
var gameStarted = false;

function initGame() {
    console.log("========================================");
    console.log("[ISEP Tycoon] Starting...");

    if (typeof exportRoot === 'undefined' || exportRoot === null) {
        console.error("[ISEP Tycoon] exportRoot not defined!");
        return;
    }

    if (window.stage) {
        window.stage.enableMouseOver(20);
    }

    loadGameSounds();

    loadBuildingsData(function () {
        initGameState();
        stopAllBuildingAnimations();
        showMainMenu();
    });
}

function showMainMenu() {
    menuInstance = findInstanceOnStage("menu_mc");

    if (!menuInstance) {
        console.log("[Menu] menu_mc not found, starting game directly");
        startGameAfterMenu();
        return;
    }

    console.log("[Menu] Main menu found");

    exportRoot.stop();

    menuInstance.visible = true;
    menuInstance.alpha = 1;
    exportRoot.setChildIndex(menuInstance, exportRoot.numChildren - 1);

    menuInstance.gotoAndPlay(0);

    // browser autoplay workaround
    setupThemeSongTrigger();

    var savedGameExists = hasSavedGame();
    console.log("[Menu] Save exists:", savedGameExists);

    var newGameBtn = menuInstance.new_game_btn;
    var continueBtn = menuInstance.continue_game_btn;

    if (newGameBtn) {
        newGameBtn.tickEnabled = false;
        newGameBtn.paused = true;
        newGameBtn.gotoAndStop(0);
        newGameBtn.cursor = "pointer";
        newGameBtn.mouseChildren = false;

        if (newGameBtn.text) newGameBtn.text.text = "NOVO JOGO";

        newGameBtn.on("click", function () {
            if (!gameStarted) {
                gameStarted = true;
                isLoadingGame = false;
                clearSavedGame();
                fadeOutMenu();
            }
        });
    }

    if (continueBtn) {
        continueBtn.tickEnabled = false;
        continueBtn.paused = true;
        continueBtn.mouseChildren = false;

        if (continueBtn.text) continueBtn.text.text = "CONTINUAR";

        if (savedGameExists) {
            continueBtn.gotoAndStop(0);
            continueBtn.cursor = "pointer";
            continueBtn.mouseEnabled = true;

            continueBtn.on("click", function () {
                if (!gameStarted) {
                    gameStarted = true;
                    isLoadingGame = true;
                    fadeOutMenu();
                }
            });
        } else {
            continueBtn.gotoAndStop(1);
            continueBtn.cursor = "default";
            continueBtn.mouseEnabled = false;
        }
    }

    var buttonsConfigured = false;
    menuInstance.on("tick", function () {
        // reconfigure buttons when they appear (frame 58+)
        if (!buttonsConfigured && menuInstance.currentFrame >= 58) {
            buttonsConfigured = true;

            var newBtn = menuInstance.new_game_btn;
            var contBtn = menuInstance.continue_game_btn;

            if (newBtn) {
                newBtn.tickEnabled = false;
                newBtn.paused = true;
                newBtn.gotoAndStop(0);
                if (newBtn.text) newBtn.text.text = "NOVO JOGO";
            }
            if (contBtn) {
                contBtn.tickEnabled = false;
                contBtn.paused = true;
                contBtn.gotoAndStop(savedGameExists ? 0 : 1);
                if (contBtn.text) contBtn.text.text = "CONTINUAR";
            }
        }

        // menu animation loop
        if (menuInstance.currentFrame >= 57 && menuInstance.currentFrame < 58) {
            menuInstance.gotoAndPlay(58);
        } else if (menuInstance.currentFrame >= 114) {
            menuInstance.gotoAndPlay(58);
        }
    });
}

function fadeOutMenu() {
    if (!menuInstance) {
        startGameAfterMenu();
        return;
    }

    console.log("[Menu] Fading out...");

    createjs.Tween.get(menuInstance)
        .to({ alpha: 0 }, 1000, createjs.Ease.quadIn)
        .call(function () {
            menuInstance.visible = false;
            menuInstance.stop();
            startGameAfterMenu();
        });
}

function startGameAfterMenu() {
    console.log("[ISEP Tycoon] Starting game...");

    if (isLoadingGame) {
        if (loadGame()) {
            console.log("[ISEP Tycoon] Loaded from localStorage");
        } else {
            console.log("[ISEP Tycoon] Load failed, starting fresh");
        }
    }

    initAlertPanel();
    initHoverTooltip();
    initUpgradePanel();
    initUI();
    initBuildings();

    // update graphics for loaded games
    for (var id in gameState.buildings) {
        updateBuildingGraphics(id);
    }

    startGameLoop();
    setupGlobalMouseMove();

    if (window.initCar) initCar();
    if (window.initEnemySystem) initEnemySystem();

    initSoundtrack();
    startAutoSave();

    console.log("[ISEP Tycoon] Game started!");
}

function loadGameSounds() {
    createjs.Sound.registerSound("assets/sfx/building_level_up.mp3", "levelUpSound");
    createjs.Sound.registerSound("assets/sfx/wrong.mp3", "wrongSound");
    createjs.Sound.registerSound("assets/sfx/death.mp3", "deathSound");
    createjs.Sound.registerSound("assets/theme_song.mp3", "themeSong");

    for (var i = 0; i < soundtrackFiles.length; i++) {
        createjs.Sound.registerSound(soundtrackFiles[i], "soundtrack_" + i);
    }
}

// plays theme on first user interaction (autoplay policy workaround)
function setupThemeSongTrigger() {
    function startThemeSong() {
        if (themeSongStarted) return;
        themeSongStarted = true;

        // resume audio context if suspended
        if (createjs.WebAudioPlugin && createjs.WebAudioPlugin.context) {
            var ctx = createjs.WebAudioPlugin.context;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
        }

        createjs.Sound.play("themeSong", { volume: SOUNDTRACK_VOLUME, loop: -1 });

        document.removeEventListener('click', startThemeSong);
        document.removeEventListener('keydown', startThemeSong);
        document.removeEventListener('touchstart', startThemeSong);

        console.log("[ISEP Tycoon] Theme started");
    }

    document.addEventListener('click', startThemeSong);
    document.addEventListener('keydown', startThemeSong);
    document.addEventListener('touchstart', startThemeSong);

    console.log("[ISEP Tycoon] Waiting for user interaction to start theme...");
}

function initSoundtrack() {
    // start first track after 10s
    setTimeout(function () {
        playTrack(0);
    }, 10000);
}

function playTrack(index) {
    if (soundtrackInstance) {
        soundtrackInstance.stop();
    }

    lastPlayedTrack = index;
    soundtrackInstance = createjs.Sound.play("soundtrack_" + index, { volume: SOUNDTRACK_VOLUME });

    if (soundtrackInstance) {
        soundtrackInstance.on("complete", function () {
            scheduleNextTrack();
        });
    }
}

function scheduleNextTrack() {
    // random delay 1:30 to 3:00
    var delayMs = (90 + Math.random() * 90) * 1000;

    setTimeout(function () {
        var nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * soundtrackFiles.length);
        } while (nextIndex === lastPlayedTrack && soundtrackFiles.length > 1);

        playTrack(nextIndex);
    }, delayMs);
}

function loadBuildingsData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'buildings.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            try {
                buildingsData = JSON.parse(xhr.responseText);
                console.log("[ISEP Tycoon] Data loaded");
                if (callback) callback();
            } catch (e) {
                console.error("[ISEP Tycoon] JSON error:", e);
            }
        }
    };
    xhr.send(null);
}

function initGameState() {
    for (var id in buildingsData) {
        gameState.buildings[id] = {
            unlocked: false,
            course_level: 0,
            infra_level: 0,
            sustain_level: 0
        };
    }
}

// -- Save/Load --

function saveGame() {
    try {
        var saveData = {
            money: gameState.money,
            students: gameState.students,
            sustainability: gameState.sustainability,
            buildings: gameState.buildings,
            timestamp: Date.now()
        };
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        console.log("[ISEP Tycoon] Auto-saved");
    } catch (e) {
        console.error("[ISEP Tycoon] Save error:", e);
    }
}

function loadGame() {
    try {
        var saveData = localStorage.getItem(SAVE_KEY);
        if (!saveData) return false;

        var data = JSON.parse(saveData);

        gameState.money = data.money || 1000;
        gameState.students = data.students || 0;
        gameState.sustainability = data.sustainability || 0;

        for (var id in data.buildings) {
            if (gameState.buildings[id]) {
                gameState.buildings[id] = data.buildings[id];
            }
        }

        console.log("[ISEP Tycoon] Game loaded");
        return true;
    } catch (e) {
        console.error("[ISEP Tycoon] Load error:", e);
        return false;
    }
}

function hasSavedGame() {
    try {
        return localStorage.getItem(SAVE_KEY) !== null;
    } catch (e) {
        return false;
    }
}

function clearSavedGame() {
    try {
        localStorage.removeItem(SAVE_KEY);
        console.log("[ISEP Tycoon] Save cleared");
    } catch (e) {
        console.error("[ISEP Tycoon] Clear error:", e);
    }
}

function startAutoSave() {
    if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);
    autoSaveIntervalId = setInterval(saveGame, AUTO_SAVE_INTERVAL);
    console.log("[ISEP Tycoon] Auto-save started (every " + (AUTO_SAVE_INTERVAL / 1000) + "s)");
}

function stopAutoSave() {
    if (autoSaveIntervalId) {
        clearInterval(autoSaveIntervalId);
        autoSaveIntervalId = null;
    }
}

function findInstanceOnStage(id) {
    if (exportRoot[id]) return exportRoot[id];
    var lib = getLib();
    if (lib && lib[id]) {
        var constructor = lib[id];
        for (var i = 0; i < exportRoot.children.length; i++) {
            var child = exportRoot.children[i];
            if (child instanceof constructor || (child.constructor && child.constructor === constructor)) {
                return child;
            }
        }
    }
    return null;
}

// -- UI --

function initUI() {
    uiInstance = findInstanceOnStage("ui_mc");

    if (uiInstance) {
        uiInstance.mouseEnabled = true;
        uiInstance.mouseChildren = true;
        uiInstance.cursor = "pointer";

        alunosInfoInstance = uiInstance.instance;

        // fallback: search children
        if (!alunosInfoInstance && uiInstance.children) {
            for (var i = 0; i < uiInstance.children.length; i++) {
                var child = uiInstance.children[i];
                if (child.student_gain_txt) {
                    alunosInfoInstance = child;
                    break;
                }
            }
        }

        if (alunosInfoInstance) {
            alunosInfoInstance.y = 30;
            alunosInfoInstance.visible = true;
            alunosInfoInstance.mouseEnabled = false;
        }

        uiInstance.on("mouseover", function () {
            isHoveringUI = true;
            if (alunosInfoInstance) {
                updateAlunosInfo();
                createjs.Tween.get(alunosInfoInstance, { override: true })
                    .to({ y: 90 }, 300, createjs.Ease.quadOut);
            }
        });

        uiInstance.on("mouseout", function () {
            isHoveringUI = false;
            if (alunosInfoInstance) {
                createjs.Tween.get(alunosInfoInstance, { override: true })
                    .to({ y: 30 }, 200, createjs.Ease.quadIn);
            }
        });
    }

    updateUI();
}

function updateAlunosInfo() {
    if (!alunosInfoInstance) return;

    var studentGain = calculateStudentGain();
    var studentLoss = window.getEnemyDamage ? getEnemyDamage() : 0;
    var delta = studentGain - studentLoss;

    if (delta >= 0) {
        alunosInfoInstance.gotoAndStop(0);
        if (alunosInfoInstance.student_gain_txt) {
            alunosInfoInstance.student_gain_txt.text = "+" + delta;
        }
    } else {
        alunosInfoInstance.gotoAndStop(1);
        if (alunosInfoInstance.student_gain_txt) {
            alunosInfoInstance.student_gain_txt.text = delta;
        }
    }
}

function updateUI() {
    if (!uiInstance) return;
    if (uiInstance.money_txt) uiInstance.money_txt.text = Math.floor(gameState.money) + "€";
    if (uiInstance.students_txt) uiInstance.students_txt.text = gameState.students + " Alunos";

    gameState.sustainability = calculateSustainability();
    if (uiInstance.sustain_txt) uiInstance.sustain_txt.text = gameState.sustainability + "%";
}

function calculateSustainability() {
    var totalPossible = 0;
    var totalAchieved = 0;

    for (var id in buildingsData) {
        var data = buildingsData[id];
        var state = gameState.buildings[id];

        if (data.sustain_upgrades && data.sustain_upgrades.length > 0) {
            totalPossible += 3;
            if (state && state.unlocked) {
                totalAchieved += (state.sustain_level || 0);
            }
        }
    }

    if (totalPossible === 0) return 0;
    return Math.floor((totalAchieved / totalPossible) * 100);
}

function initAlertPanel() {
    var lib = getLib();
    if (lib && lib.alert_mc) {
        if (alertPanel && alertPanel.parent) alertPanel.parent.removeChild(alertPanel);
        alertPanel = new window.lib.alert_mc();
        alertPanel.name = "alertPanel";
        alertPanel.x = 786.95;
        alertPanel.y = -100;
        exportRoot.addChild(alertPanel);
    }
}

function initHoverTooltip() {
    var lib = getLib();
    if (lib && lib.hover_mc) {
        if (hoverInstance && hoverInstance.parent) hoverInstance.parent.removeChild(hoverInstance);
        hoverInstance = new lib.hover_mc();
        hoverInstance.mouseEnabled = false;
        hoverInstance.visible = false;
        exportRoot.addChild(hoverInstance);
    }
}

// tooltip follows mouse
function setupGlobalMouseMove() {
    if (!window.stage) return;

    window.stage.on("stagemousemove", function (evt) {
        if (hoverInstance && hoverInstance.visible) {
            var localPt = exportRoot.globalToLocal(evt.stageX, evt.stageY);

            // offset to align tooltip arrow
            hoverInstance.x = localPt.x - 88.15;
            hoverInstance.y = localPt.y - 166.4;

            exportRoot.setChildIndex(hoverInstance, exportRoot.numChildren - 1);
        }
    });
}

function showAlert() {
    if (!alertPanel) return;
    exportRoot.setChildIndex(alertPanel, exportRoot.numChildren - 1);
    createjs.Sound.play("wrongSound", { volume: SFX_VOLUME });
    createjs.Tween.get(alertPanel, { override: true })
        .to({ x: 786.95, y: 23.6 }, 500, createjs.Ease.cubicOut)
        .wait(2000)
        .to({ y: -100 }, 500, createjs.Ease.cubicIn);
}

// -- Buildings --

function initBuildings() {
    for (var id in buildingsData) {
        var mc = findInstanceOnStage(id);
        if (mc) setupBuildingInteraction(mc, id);
    }

    if (window.stage) {
        window.stage.on("stagemousedown", function (evt) {
            if (currentOpenBuildingId && upgradePanel && upgradePanel.x > -100) {
                var pt = upgradePanel.globalToLocal(evt.stageX, evt.stageY);
                if (!upgradePanel.hitTest(pt.x, pt.y)) closeUpgradePanel();
            }
        });
    }
}

function setupBuildingInteraction(mc, id) {
    mc.buildingId = id;
    mc.cursor = "pointer";
    mc.mouseChildren = false;
    updateBuildingGraphics(id);

    var brightnessFilter = new createjs.ColorMatrixFilter([
        1.2, 0, 0, 0, 10,
        0, 1.2, 0, 0, 10,
        0, 0, 1.2, 0, 10,
        0, 0, 0, 1, 0
    ]);

    mc.on("mouseover", function () {
        var isParking = id.toLowerCase().includes("estacionamento");
        var isUnlocked = gameState.buildings[id].unlocked;

        // no hover effect for purchased parking
        if (isParking && isUnlocked) return;

        mc.scaleX = mc.scaleY = 1.05;
        mc.alpha = 0.9;
        mc.filters = [brightnessFilter];
        mc.cache(0, 0, mc.nominalBounds.width, mc.nominalBounds.height);

        if (!isUnlocked && hoverInstance) {
            hoverInstance.visible = true;
            updateHoverData(id);
        }
    });

    mc.on("mouseout", function () {
        mc.scaleX = mc.scaleY = 1.0;
        mc.alpha = 1.0;
        mc.filters = [];
        mc.uncache();
        if (hoverInstance) hoverInstance.visible = false;
    });

    mc.on("click", function (evt) {
        evt.stopPropagation();
        handleBuildingClick(id, mc);
        if (hoverInstance) hoverInstance.visible = false;
    });
}

function updateHoverData(id) {
    if (!hoverInstance || !buildingsData[id]) return;
    var data = buildingsData[id];
    if (hoverInstance.hover_building) hoverInstance.hover_building.text = data.title;
    if (hoverInstance.hover_cost) hoverInstance.hover_cost.text = data.unlock_cost + "€";
}

function handleBuildingClick(id, mc) {
    var bState = gameState.buildings[id];
    var bData = buildingsData[id];

    if (!bState.unlocked) {
        if (gameState.money >= bData.unlock_cost) {
            gameState.money -= bData.unlock_cost;
            bState.unlocked = true;
            if (bData.students_bonus) gameState.students += bData.students_bonus;
            updateBuildingGraphics(id);
            createjs.Sound.play("levelUpSound", { volume: SFX_VOLUME });
            updateUI();
            createjs.Tween.get(mc).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.bounceOut);
        } else {
            showAlert();
        }
    } else {
        var hasUpgrades = (bData.course_upgrades && bData.course_upgrades.length > 0) ||
            (bData.infra_upgrades && bData.infra_upgrades.length > 0) ||
            (bData.sustain_upgrades && bData.sustain_upgrades.length > 0);
        if (hasUpgrades) openUpgradePanel(id);
    }
}

// -- Upgrades --

function initUpgradePanel() {
    upgradePanel = findInstanceOnStage("upgrade_mc");
    if (!upgradePanel) return;
    upgradePanel.x = -800;
    var courseBtn = findChildByType(upgradePanel, "course_upgrade_mc");
    var infraBtn = findChildByType(upgradePanel, "infra_upgrade_mc");
    var sustainBtn = findChildByType(upgradePanel, "sustain_upgrade_mc");
    setupUpgradeButton(courseBtn, "course");
    setupUpgradeButton(infraBtn, "infra");
    setupUpgradeButton(sustainBtn, "sustain");
}

function findChildByType(container, linkageName) {
    var lib = getLib();
    if (!lib || !lib[linkageName]) return null;
    var constructor = lib[linkageName];
    for (var i = 0; i < container.children.length; i++) {
        var child = container.children[i];
        if (child instanceof constructor || (child.constructor && child.constructor === constructor)) return child;
    }
    return null;
}

function setupUpgradeButton(mc, type) {
    if (!mc) return;
    mc.cursor = "pointer";
    mc.mouseChildren = false;
    mc.on("click", function () { buyUpgrade(type); });
}

function openUpgradePanel(buildingId) {
    currentOpenBuildingId = buildingId;
    updateUpgradePanelUI();
    createjs.Tween.get(upgradePanel, { override: true }).to({ x: 223 }, 500, createjs.Ease.cubicOut);
}

function closeUpgradePanel() {
    currentOpenBuildingId = null;
    createjs.Tween.get(upgradePanel, { override: true }).to({ x: -800 }, 500, createjs.Ease.cubicIn);
}

function updateUpgradePanelUI() {
    if (!currentOpenBuildingId || !upgradePanel) return;
    var id = currentOpenBuildingId;
    var data = buildingsData[id];
    var state = gameState.buildings[id];
    if (upgradePanel.upgrade_mc_title) upgradePanel.upgrade_mc_title.text = data.title;
    var courseBtn = findChildByType(upgradePanel, "course_upgrade_mc");
    var infraBtn = findChildByType(upgradePanel, "infra_upgrade_mc");
    var sustainBtn = findChildByType(upgradePanel, "sustain_upgrade_mc");
    updateUpgradeSection(courseBtn, data.course_upgrades, state.course_level, data.cost_multiplier);
    updateUpgradeSection(infraBtn, data.infra_upgrades, state.infra_level, data.cost_multiplier);
    updateUpgradeSection(sustainBtn, data.sustain_upgrades, state.sustain_level, data.cost_multiplier);
}

function updateUpgradeSection(mc, upgradesList, currentLevel, multiplier) {
    if (!mc) return;
    mc.gotoAndStop(currentLevel);
    var fields = findTextFields(mc);
    if (currentLevel < 3) {
        var nextUpgrade = upgradesList[currentLevel];
        var cost = Math.floor(nextUpgrade.base_cost * GLOBAL_MULTIPLIER * multiplier);
        if (fields.title) {
            fields.title.text = nextUpgrade.title;
            fields.title.lineWidth = 250;
        }
        if (fields.desc) {
            fields.desc.text = nextUpgrade.desc;
            fields.desc.lineWidth = 150;
        }
        if (fields.price) fields.price.text = cost + "€";
        if (fields.btn) fields.btn.text = "COMPRAR";
    } else {
        if (fields.title) {
            fields.title.text = "MÁXIMO";
            fields.title.lineWidth = 250;
        }
        if (fields.desc) {
            fields.desc.text = "Nível máximo atingido.";
            fields.desc.lineWidth = 200;
        }
        if (fields.price) fields.price.text = "---";
        if (fields.btn) fields.btn.text = "MAX";
    }
}

function findTextFields(mc) {
    var fields = { title: null, desc: null, price: null, btn: null };
    if (!mc || !mc.children) return fields;
    for (var i = 0; i < mc.children.length; i++) {
        var child = mc.children[i];
        if (child instanceof createjs.Text) {
            if (Math.abs(child.x - 113) < 30 && Math.abs(child.y - 8) < 30) fields.title = child;
            else if (Math.abs(child.x - 113) < 30 && Math.abs(child.y - 42) < 30) fields.desc = child;
            else if (Math.abs(child.x - 308) < 30 && Math.abs(child.y - 50) < 30) fields.price = child;
            else if (Math.abs(child.x - 308) < 30 && Math.abs(child.y - 23) < 30) fields.btn = child;
        }
    }
    return fields;
}

function buyUpgrade(type) {
    if (!currentOpenBuildingId) return;
    var id = currentOpenBuildingId;
    var data = buildingsData[id];
    var state = gameState.buildings[id];
    var levelKey = type + "_level";
    var upgradesList = data[type + "_upgrades"];
    var currentLevel = state[levelKey];
    if (currentLevel >= 3) return;
    var upgradeInfo = upgradesList[currentLevel];
    var cost = Math.floor(upgradeInfo.base_cost * GLOBAL_MULTIPLIER * data.cost_multiplier);
    if (gameState.money >= cost) {
        gameState.money -= cost;
        state[levelKey]++;
        if (upgradeInfo.students_bonus) gameState.students += upgradeInfo.students_bonus;

        if (type === "sustain") {
            updateBuildingGraphics(id);
        }

        createjs.Sound.play("levelUpSound", { volume: SFX_VOLUME });
        updateUI();
        updateUpgradePanelUI();
    } else {
        showAlert();
    }
}

// -- Graphics --

// frame 0 = locked, frame 1 = unlocked, frames 2-4 = sustainability levels
function updateBuildingGraphics(id) {
    var mc = findInstanceOnStage(id);
    if (!mc) return;

    var state = gameState.buildings[id];

    if (!state.unlocked) {
        mc.gotoAndStop(0);
    } else {
        var frameIndex = 1 + (state.sustain_level || 0);
        mc.gotoAndStop(frameIndex);
    }
}

// freezes all animations before menu shows
function stopAllBuildingAnimations() {
    for (var id in buildingsData) {
        var mc = findInstanceOnStage(id);
        if (mc) {
            mc.stop();
            mc.gotoAndStop(0);
        }
    }

    var uiMc = findInstanceOnStage("ui_mc");
    if (uiMc) {
        uiMc.stop();
        uiMc.gotoAndStop(0);
    }

    var upgradeMc = findInstanceOnStage("upgrade_mc");
    if (upgradeMc) {
        upgradeMc.stop();
        upgradeMc.gotoAndStop(0);
        upgradeMc.x = -800;
    }

    console.log("[ISEP Tycoon] Animations stopped");
}

// -- Economy --

function startGameLoop() {
    if (gameTickInterval) clearInterval(gameTickInterval);
    gameTickInterval = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    // income per tick
    var income = gameState.students * INCOME_PER_STUDENT;
    var maintenanceFactor = 1 - (gameState.sustainability / 100);
    var maintenanceCost = (gameState.students * 0.1) * maintenanceFactor;
    var profit = income - maintenanceCost;
    if (profit > 0) {
        gameState.money += profit;
    }

    // students every 5s
    var now = Date.now();
    if (now - lastStudentUpdateTime >= STUDENT_UPDATE_INTERVAL) {
        lastStudentUpdateTime = now;

        var studentGain = calculateStudentGain();
        var studentLoss = 0;
        if (window.getEnemyDamage) studentLoss = getEnemyDamage();

        currentStudentDelta = studentGain - studentLoss;
        gameState.students += currentStudentDelta;

        if (gameState.students < 0) gameState.students = 0;

        if (gameState.students <= 0 && window.getActiveEnemyCount && getActiveEnemyCount() > 0) {
            gameOver();
        }
    }

    updateUI();

    if (isHoveringUI) {
        updateAlunosInfo();
    }
}

function calculateStudentGain() {
    var gain = 0;
    for (var id in gameState.buildings) {
        var b = gameState.buildings[id];
        if (b.unlocked) {
            gain += 0.5;
            gain += (b.course_level || 0) * 0.2;
            gain += (b.infra_level || 0) * 0.1;
        }
    }
    return Math.floor(gain);
}

function gameOver() {
    clearInterval(gameTickInterval);
    stopAutoSave();
    clearSavedGame();
    alert("GAME OVER! Os estudantes abandonaram o ISEP devido à praxe descontrolada!");
    location.reload();
}
