/**
 * ISEP Tycoon - Game Logic
 * Código JavaScript para Adobe Animate HTML5 Canvas (CreateJS)
 */

// ============================================
// CONFIGURAÇÃO GLOBAL
// ============================================
var GLOBAL_MULTIPLIER = 1.0;
var INCOME_PER_STUDENT = 0.5; // Dinheiro gerado por aluno por tick
var TICK_RATE = 1000; // 1 segundo por tick

// ID da composição do Adobe Animate
var COMP_ID = "C4EE32689A47AB45842BDB0D0E7EC980";

// ============================================
// ESTADO DO JOGO (GAME STATE)
// ============================================
var gameState = {
    money: 1000,
    students: 0,
    sustainability: 0,
    buildings: {} // Será preenchido com dados do JSON
};

// Dados carregados do JSON
var buildingsData = null;

// Referências UI
var uiInstance = null;
var upgradePanel = null;
var alertPanel = null;
var hoverInstance = null; // Instância do tooltip de hover
var currentOpenBuildingId = null;
var isHoveringLocked = false;

// Timer do loop de economia
var gameTickInterval = null;

// Helper para obter a library (lib) de forma robusta
function getLib() {
    if (window.lib) return window.lib;
    if (typeof AdobeAn !== 'undefined') {
        var comp = AdobeAn.getComposition(COMP_ID);
        if (comp) return comp.getLibrary();
    }
    return null;
}

// ============================================
// INICIALIZAÇÃO
// ============================================
function initGame() {
    console.log("========================================");
    console.log("[ISEP Tycoon] A iniciar o jogo...");

    if (typeof exportRoot === 'undefined' || exportRoot === null) {
        console.error("[ISEP Tycoon] ERRO: exportRoot não definido!");
        return;
    }

    // Tentar garantir que o Stage tem o mouse over ligado, mesmo que o HTML seja overwritten
    if (window.stage) {
        window.stage.enableMouseOver(20);
    }

    // 1. Carregar Sons
    loadGameSounds();

    // 2. Carregar Dados (JSON)
    loadBuildingsData(function () {
        // 3. Inicializar Estado dos Edifícios
        initGameState();

        // 4. Configurar Painel de Alerta
        initAlertPanel();

        // 5. Configurar Tooltip de Hover
        initHoverTooltip();

        // 6. Configurar Painel de Upgrades
        initUpgradePanel();

        // 7. Inicializar UI
        initUI();

        // 8. Configurar Edifícios no Stage
        initBuildings();

        // 9. Iniciar Loop de Economia
        startGameLoop();

        // 10. Listener Global de Mouse para o Hover seguir o rato
        setupGlobalMouseMove();

        // 11. Inicializar Carro
        if (window.initCar) initCar();

        console.log("[ISEP Tycoon] Jogo iniciado com sucesso!");
    });
}

function loadGameSounds() {
    createjs.Sound.registerSound("assets/sfx/building_level_up.mp3", "levelUpSound");
    createjs.Sound.registerSound("assets/sfx/wrong.mp3", "wrongSound");
}

function loadBuildingsData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'buildings.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            try {
                buildingsData = JSON.parse(xhr.responseText);
                console.log("[ISEP Tycoon] Dados carregados.");
                if (callback) callback();
            } catch (e) {
                console.error("[ISEP Tycoon] Erro no JSON: ", e);
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

// ============================================
// UI & TOOLTIPS
// ============================================
function initUI() {
    uiInstance = findInstanceOnStage("ui_mc");
    updateUI();
}

function updateUI() {
    if (!uiInstance) return;
    if (uiInstance.money_txt) uiInstance.money_txt.text = Math.floor(gameState.money) + "€";
    if (uiInstance.students_txt) uiInstance.students_txt.text = gameState.students + " Alunos";
    if (uiInstance.sustain_txt) uiInstance.sustain_txt.text = gameState.sustainability + "%";
}

function initAlertPanel() {
    var lib = getLib();
    if (lib && lib.alert_mc) {
        if (alertPanel && alertPanel.parent) alertPanel.parent.removeChild(alertPanel);
        alertPanel = new window.lib.alert_mc();
        alertPanel.name = "alertPanel";
        // Posição inicial: Usando coordenadas sugeridas (Y negativo para esconder)
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

/**
 * Listener global no Stage para o tooltip seguir o rato de forma fluída.
 */
function setupGlobalMouseMove() {
    if (!window.stage) return;

    window.stage.on("stagemousemove", function (evt) {
        if (hoverInstance && hoverInstance.visible) {
            // Converter posição do Stage para posição local dentro do exportRoot
            var localPt = exportRoot.globalToLocal(evt.stageX, evt.stageY);

            // Aplicar coordenadas com o offset para alinhar a ponta da seta (X: 88.15, Y: 166.4)
            hoverInstance.x = localPt.x - 88.15;
            hoverInstance.y = localPt.y - 166.4;

            // Garantir que está sempre no topo
            exportRoot.setChildIndex(hoverInstance, exportRoot.numChildren - 1);
        }
    });
}

function showAlert() {
    if (!alertPanel) return;
    exportRoot.setChildIndex(alertPanel, exportRoot.numChildren - 1);
    createjs.Sound.play("wrongSound");
    createjs.Tween.get(alertPanel, { override: true })
        .to({ x: 786.95, y: 23.6 }, 500, createjs.Ease.cubicOut)
        .wait(2000)
        .to({ y: -100 }, 500, createjs.Ease.cubicIn);
}

// ============================================
// EDIFÍCIOS & INTERAÇÃO
// ============================================
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
    mc.gotoAndStop(gameState.buildings[id].unlocked ? 1 : 0);

    var brightnessFilter = new createjs.ColorMatrixFilter([
        1.2, 0, 0, 0, 10,
        0, 1.2, 0, 0, 10,
        0, 0, 1.2, 0, 10,
        0, 0, 0, 1, 0
    ]);

    mc.on("mouseover", function () {
        mc.scaleX = mc.scaleY = 1.05;
        mc.alpha = 0.9;
        mc.filters = [brightnessFilter];
        mc.cache(0, 0, mc.nominalBounds.width, mc.nominalBounds.height);

        if (!gameState.buildings[id].unlocked && hoverInstance) {
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
            mc.gotoAndStop(1);
            createjs.Sound.play("levelUpSound");
            updateUI();
            createjs.Tween.get(mc).to({ scaleX: 1.2, scaleY: 1.2 }, 100).to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.bounceOut);
        } else {
            showAlert();
        }
    } else {
        var hasUpgrades = (bData.course_upgrades && bData.course_upgrades.length > 0) || (bData.infra_upgrades && bData.infra_upgrades.length > 0) || (bData.sustain_upgrades && bData.sustain_upgrades.length > 0);
        if (hasUpgrades) openUpgradePanel(id);
    }
}

// ============================================
// LÓGICA DE UPGRADES
// ============================================
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
        if (fields.title) fields.title.text = nextUpgrade.title;
        if (fields.desc) fields.desc.text = nextUpgrade.desc;
        if (fields.price) fields.price.text = cost + "€";
        if (fields.btn) fields.btn.text = "COMPRAR";
    } else {
        if (fields.title) fields.title.text = "MÁXIMO";
        if (fields.desc) fields.desc.text = "Nível máximo atingido.";
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
        if (upgradeInfo.sustain_bonus) gameState.sustainability += upgradeInfo.sustain_bonus;
        if (gameState.sustainability > 100) gameState.sustainability = 100;
        createjs.Sound.play("levelUpSound");
        updateUI();
        updateUpgradePanelUI();
    } else {
        showAlert();
    }
}

// ============================================
// ECONOMIA (GAME LOOP)
// ============================================
function startGameLoop() {
    if (gameTickInterval) clearInterval(gameTickInterval);
    gameTickInterval = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    var income = gameState.students * INCOME_PER_STUDENT;
    var maintenanceFactor = 1 - (gameState.sustainability / 100);
    var maintenanceCost = (gameState.students * 0.1) * maintenanceFactor;
    var profit = income - maintenanceCost;
    if (profit > 0) {
        gameState.money += profit;
        updateUI();
    }
}
