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
var currentOpenBuildingId = null;

// Timer do loop de economia
var gameTickInterval = null;

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

    // 1. Carregar Sons
    loadGameSounds();

    // 2. Carregar Dados (JSON)
    loadBuildingsData(function () {
        // Callback quando JSON estiver carregado

        // 3. Inicializar Estado dos Edifícios
        initGameState();

        // 4. Inicializar UI
        initUI();

        // 5. Configurar Edifícios no Stage
        initBuildings();

        // 6. Configurar Painel de Upgrades
        initUpgradePanel();

        // 7. Iniciar Loop de Economia
        startGameLoop();

        console.log("[ISEP Tycoon] Jogo iniciado com sucesso!");
    });
}

function loadGameSounds() {
    createjs.Sound.registerSound("assets/sfx/building_level_up.mp3", "levelUpSound");
}

function loadBuildingsData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'buildings.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            try {
                buildingsData = JSON.parse(xhr.responseText);
                console.log("[ISEP Tycoon] Dados carregados: " + Object.keys(buildingsData).length + " edifícios.");
                if (callback) callback();
            } catch (e) {
                console.error("[ISEP Tycoon] Erro ao fazer parse do JSON: ", e);
            }
        }
    };
    xhr.send(null);
}

function initGameState() {
    // Inicializar o estado de cada edifício com base no JSON
    for (var id in buildingsData) {
        gameState.buildings[id] = {
            unlocked: false,
            course_level: 0,
            infra_level: 0,
            sustain_level: 0
        };
    }
}

// ============================================
// UI & INTERFACE
// ============================================
function initUI() {
    uiInstance = exportRoot.instance_1; // Ajustado conforme isep_game.js (instance_1 é ui_mc)
    if (!uiInstance) console.warn("UI (instance_1) não encontrada!");
    updateUI();
}

function updateUI() {
    if (!uiInstance) return;

    if (uiInstance.money_txt) uiInstance.money_txt.text = Math.floor(gameState.money) + "€";
    if (uiInstance.students_txt) uiInstance.students_txt.text = gameState.students + " Alunos";
    if (uiInstance.sustain_txt) uiInstance.sustain_txt.text = gameState.sustainability + "%";
}

function initUpgradePanel() {
    // O painel de upgrade é o 'instance' (upgrade_mc) conforme isep_game.js
    upgradePanel = exportRoot.instance;

    if (!upgradePanel) {
        console.error("Painel de Upgrade (instance) não encontrado!");
        return;
    }

    // Posição inicial (escondido à esquerda)
    // Assumindo que o ponto de registo está no centro ou topo esquerdo, ajustamos para ficar fora
    upgradePanel.x = -800;

    // Configurar botões dentro do painel
    setupUpgradeButton(upgradePanel.instance_2, "course");  // course_upgrade_mc
    setupUpgradeButton(upgradePanel.instance_1, "infra");   // infra_upgrade_mc
    setupUpgradeButton(upgradePanel.instance, "sustain"); // sustain_upgrade_mc (nota: instance dentro de upgrade_mc)
}

function setupUpgradeButton(mc, type) {
    if (!mc) return;

    // O botão de compra é o texto "comprar" ou a área clicável. 
    // No JSON structure, parece que o próprio MC serve de botão ou tem um hit area.
    // Vamos assumir que clicamos no MC todo para comprar.

    mc.cursor = "pointer";
    mc.mouseChildren = false; // Tratar como um botão único

    mc.on("click", function () {
        buyUpgrade(type);
    });
}

// ============================================
// EDIFÍCIOS & INTERAÇÃO
// ============================================
function initBuildings() {
    // Mapeamento manual das instâncias do stage para os IDs do JSON
    // Atualizado com base no isep_game.js mais recente
    var instanceMap = {
        "biblioteca_mc": exportRoot.instance_3,
        "secretaria_mc": exportRoot.instance_4,
        "c_mc": exportRoot.instance_5,
        "f_mc": exportRoot.instance_6,
        "j_mc": exportRoot.instance_7,
        "i_mc": exportRoot.instance_8,
        "b_mc": exportRoot.instance_9,
        "g_mc": exportRoot.instance_10,
        "h_mc": exportRoot.instance_11,
        "bar_mc": exportRoot.instance_12,

        // Novos edifícios
        "auditorio_mc": exportRoot.instance_2,
        "estacionamento_sec_mc": exportRoot.instance_13,
        "estacionamento_f_mc": exportRoot.instance_14,
        "estacionamento_baixo_mc": exportRoot.instance_15,
        "estacionamento_h_mc": exportRoot.instance_16,
        "estacionamento_b_mc": exportRoot.instance_17,
        "estacionamento_eng_mc": exportRoot.instance_18
    };

    for (var id in buildingsData) {
        var mc = instanceMap[id];
        if (mc) {
            setupBuildingInteraction(mc, id);
        } else {
            console.warn("Instância não encontrada para: " + id);
        }
    }

    // Listener global para fechar painel ao clicar fora
    stage.on("stagemousedown", function (evt) {
        // Se o painel estiver aberto e o clique não for no painel nem num edifício
        if (currentOpenBuildingId && upgradePanel.x > -100) {
            // Verificar se clicou no painel
            var pt = upgradePanel.globalToLocal(evt.stageX, evt.stageY);
            if (!upgradePanel.hitTest(pt.x, pt.y)) {
                closeUpgradePanel();
            }
        }
    });
}

function setupBuildingInteraction(mc, id) {
    mc.buildingId = id;
    mc.cursor = "pointer";
    mc.mouseChildren = false;

    // Estado inicial visual
    mc.gotoAndStop(gameState.buildings[id].unlocked ? 1 : 0);

    // Filtro de brilho para hover
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
    });

    mc.on("mouseout", function () {
        mc.scaleX = mc.scaleY = 1.0;
        mc.alpha = 1.0;
        mc.filters = [];
        mc.uncache();
    });

    mc.on("click", function (evt) {
        // Impedir propagação para o stage (para não fechar o painel imediatamente)
        evt.stopPropagation();
        handleBuildingClick(id, mc);
    });
}

function handleBuildingClick(id, mc) {
    var bState = gameState.buildings[id];
    var bData = buildingsData[id];

    if (!bState.unlocked) {
        // Tentar desbloquear
        if (gameState.money >= bData.unlock_cost) {
            gameState.money -= bData.unlock_cost;
            bState.unlocked = true;

            // Aplicar bónus de alunos ao desbloquear (se existir)
            if (bData.students_bonus) {
                gameState.students += bData.students_bonus;
            }

            mc.gotoAndStop(1);
            createjs.Sound.play("levelUpSound");
            updateUI();

            // Animação de desbloqueio
            createjs.Tween.get(mc)
                .to({ scaleX: 1.2, scaleY: 1.2 }, 100)
                .to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.bounceOut);

            console.log("Desbloqueado: " + id);
        } else {
            alert("Dinheiro insuficiente! Custo: " + bData.unlock_cost + "€");
        }
    } else {
        // Já desbloqueado -> Abrir Painel APENAS se tiver upgrades
        var hasUpgrades = (bData.course_upgrades && bData.course_upgrades.length > 0) ||
            (bData.infra_upgrades && bData.infra_upgrades.length > 0) ||
            (bData.sustain_upgrades && bData.sustain_upgrades.length > 0);

        if (hasUpgrades) {
            openUpgradePanel(id);
        } else {
            console.log("Edifício sem upgrades: " + id);
            // Opcional: Mostrar um pequeno feedback visual ou som
        }
    }
}

// ============================================
// LÓGICA DE UPGRADES
// ============================================
function openUpgradePanel(buildingId) {
    currentOpenBuildingId = buildingId;
    updateUpgradePanelUI();

    // Animar entrada
    createjs.Tween.get(upgradePanel, { override: true })
        .to({ x: 223 }, 500, createjs.Ease.cubicOut); // 223 é a posição original no FLA
}

function closeUpgradePanel() {
    currentOpenBuildingId = null;
    createjs.Tween.get(upgradePanel, { override: true })
        .to({ x: -800 }, 500, createjs.Ease.cubicIn);
}

function updateUpgradePanelUI() {
    if (!currentOpenBuildingId) return;

    var id = currentOpenBuildingId;
    var data = buildingsData[id];
    var state = gameState.buildings[id];

    // Título do Painel
    upgradePanel.upgrade_mc_title.text = data.title;

    // Atualizar cada secção (Course, Infra, Sustain)
    updateUpgradeSection(upgradePanel.instance_2, data.course_upgrades, state.course_level, data.cost_multiplier);
    updateUpgradeSection(upgradePanel.instance_1, data.infra_upgrades, state.infra_level, data.cost_multiplier);
    updateUpgradeSection(upgradePanel.instance, data.sustain_upgrades, state.sustain_level, data.cost_multiplier);
}

function updateUpgradeSection(mc, upgradesList, currentLevel, multiplier) {
    // Frame 0, 1, 2, 3 correspondem aos níveis visualmente
    mc.gotoAndStop(currentLevel);

    // Usar a nova função robusta para encontrar os campos de texto
    var fields = findTextFields(mc);

    if (currentLevel < 3) {
        var nextUpgrade = upgradesList[currentLevel];
        var cost = Math.floor(nextUpgrade.base_cost * GLOBAL_MULTIPLIER * multiplier);

        if (fields.title) fields.title.text = nextUpgrade.title;
        if (fields.desc) fields.desc.text = nextUpgrade.desc;
        if (fields.price) fields.price.text = cost + "€";
        if (fields.btn) fields.btn.text = "COMPRAR";

    } else {
        // Nível Máximo (Frame 3)
        if (fields.title) fields.title.text = "MÁXIMO";
        if (fields.desc) fields.desc.text = "Nível máximo atingido.";
        if (fields.price) fields.price.text = "---";
        if (fields.btn) fields.btn.text = "MAX";
    }
}

// Função auxiliar robusta para encontrar campos de texto pela posição
function findTextFields(mc) {
    var fields = {
        title: null,
        desc: null,
        price: null,
        btn: null
    };

    if (!mc || !mc.children) return fields;

    for (var i = 0; i < mc.children.length; i++) {
        var child = mc.children[i];

        // Verificar se é um objeto de texto
        if (child instanceof createjs.Text) {
            // Identificar pelo posicionamento aproximado (tolerância de +/- 20px)

            // Título: x ≈ 113, y ≈ 8
            if (Math.abs(child.x - 113) < 20 && Math.abs(child.y - 8) < 20) {
                fields.title = child;
            }
            // Descrição: x ≈ 113, y ≈ 42
            else if (Math.abs(child.x - 113) < 20 && Math.abs(child.y - 42) < 20) {
                fields.desc = child;
            }
            // Preço: x ≈ 308, y ≈ 50
            else if (Math.abs(child.x - 308) < 20 && Math.abs(child.y - 50) < 20) {
                fields.price = child;
            }
            // Botão (Texto "comprar"): x ≈ 308, y ≈ 23
            else if (Math.abs(child.x - 308) < 20 && Math.abs(child.y - 23) < 20) {
                fields.btn = child;
            }
        }
    }
    return fields;
}

function buyUpgrade(type) {
    if (!currentOpenBuildingId) return;

    var id = currentOpenBuildingId;
    var data = buildingsData[id];
    var state = gameState.buildings[id];
    var levelKey = type + "_level"; // course_level, infra_level...
    var upgradesList = data[type + "_upgrades"];

    var currentLevel = state[levelKey];

    if (currentLevel >= 3) return; // Já está no máximo

    var upgradeInfo = upgradesList[currentLevel];
    var cost = Math.floor(upgradeInfo.base_cost * GLOBAL_MULTIPLIER * data.cost_multiplier);

    if (gameState.money >= cost) {
        // Comprar
        gameState.money -= cost;
        state[levelKey]++;

        // Aplicar bónus
        if (upgradeInfo.students_bonus) gameState.students += upgradeInfo.students_bonus;
        if (upgradeInfo.sustain_bonus) gameState.sustainability += upgradeInfo.sustain_bonus;

        // Limitar sustentabilidade a 100%
        if (gameState.sustainability > 100) gameState.sustainability = 100;

        createjs.Sound.play("levelUpSound");
        updateUI();
        updateUpgradePanelUI();

        console.log("Upgrade comprado: " + type + " nível " + state[levelKey] + " para " + id);
    } else {
        alert("Dinheiro insuficiente! Custo: " + cost + "€");
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
    // Calcular rendimento
    // Base: alunos * income
    // Manutenção: custo base reduzido pela sustentabilidade

    var income = gameState.students * INCOME_PER_STUDENT;

    // Custo de manutenção (exemplo simples: 10% do income é perdido em manutenção, 
    // mas sustentabilidade reduz isso)
    // Se sustain = 100%, manutenção = 0. Se sustain = 0%, manutenção = max.

    var maintenanceFactor = 1 - (gameState.sustainability / 100);
    var maintenanceCost = (gameState.students * 0.1) * maintenanceFactor;

    var profit = income - maintenanceCost;

    if (profit > 0) {
        gameState.money += profit;
        updateUI();
    }

    // console.log("Tick: Income=" + income.toFixed(1) + " Maint=" + maintenanceCost.toFixed(1));
}
