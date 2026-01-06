/**
 * ISEP Tycoon - Game Logic
 * Código JavaScript para Adobe Animate HTML5 Canvas (CreateJS)
 */

// ============================================
// CONFIGURAÇÃO GLOBAL
// ============================================
var GLOBAL_MULTIPLIER = 1.0;
var INCOME_PER_STUDENT = 0.2; // Reduzido de 0.5 para tornar economia mais lenta
var TICK_RATE = 1000;
var STUDENT_UPDATE_INTERVAL = 5000; // 5 segundos para ganho/perda de alunos

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

var gameTickInterval = null;
var lastStudentUpdateTime = 0;
var currentStudentDelta = 0;
var alunosInfoInstance = null;

// Sistema de Auto-Save
var SAVE_KEY = "isep_tycoon_save";
var AUTO_SAVE_INTERVAL = 15000; // 15 segundos
var autoSaveIntervalId = null;
var isLoadingGame = false;
var isHoveringUI = false;

// Sistema de Soundtrack
var soundtrackFiles = [
    "assets/soundtrack/Soundtrack_1.mp3",
    "assets/soundtrack/Soundtrack_2.mp3",
    "assets/soundtrack/Soundtrack_3.mp3"
];
var lastPlayedTrack = -1;
var soundtrackInstance = null;
var SOUNDTRACK_VOLUME = 0.02;
var SFX_VOLUME = 0.2;

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
var menuInstance = null;
var gameStarted = false;

function initGame() {
    console.log("========================================");
    console.log("[ISEP Tycoon] A iniciar...");

    if (typeof exportRoot === 'undefined' || exportRoot === null) {
        console.error("[ISEP Tycoon] ERRO: exportRoot não definido!");
        return;
    }

    if (window.stage) {
        window.stage.enableMouseOver(20);
    }

    // Carregar Sons primeiro
    loadGameSounds();

    // Carregar dados e depois mostrar menu
    loadBuildingsData(function () {
        initGameState();

        // Parar todas as animações dos edifícios imediatamente
        stopAllBuildingAnimations();

        showMainMenu();
    });
}

function showMainMenu() {
    menuInstance = findInstanceOnStage("menu_mc");

    if (!menuInstance) {
        console.log("[Menu] menu_mc não encontrado, iniciando jogo diretamente");
        startGameAfterMenu();
        return;
    }

    console.log("[Menu] Menu principal encontrado");

    // Parar animação do jogo enquanto está no menu
    exportRoot.stop();

    // Garantir que o menu está visível e no topo
    menuInstance.visible = true;
    menuInstance.alpha = 1;
    exportRoot.setChildIndex(menuInstance, exportRoot.numChildren - 1);

    // Iniciar animação de intro (frames 0-57)
    menuInstance.gotoAndPlay(0);

    // Tocar theme song quando o menu abre
    createjs.Sound.play("themeSong", { volume: SOUNDTRACK_VOLUME, loop: -1 });

    // Verificar se há jogo guardado
    var savedGameExists = hasSavedGame();
    console.log("[Menu] Jogo guardado encontrado:", savedGameExists);

    // Configurar botões
    var newGameBtn = menuInstance.new_game_btn;
    var continueBtn = menuInstance.continue_game_btn;

    // Configurar botão Novo Jogo
    if (newGameBtn) {
        newGameBtn.tickEnabled = false;
        newGameBtn.paused = true;
        newGameBtn.gotoAndStop(0); // Frame 1 = ativado
        newGameBtn.cursor = "pointer";
        newGameBtn.mouseChildren = false;

        if (newGameBtn.text) newGameBtn.text.text = "NOVO JOGO";

        newGameBtn.on("click", function () {
            if (!gameStarted) {
                gameStarted = true;
                isLoadingGame = false;
                clearSavedGame(); // Limpar dados guardados ao iniciar novo jogo
                fadeOutMenu();
            }
        });
    }

    // Configurar botão Continuar
    if (continueBtn) {
        continueBtn.tickEnabled = false;
        continueBtn.paused = true;
        continueBtn.mouseChildren = false;

        if (continueBtn.text) continueBtn.text.text = "CONTINUAR";

        if (savedGameExists) {
            // Ativar botão se há jogo guardado
            continueBtn.gotoAndStop(0); // Frame 1 = ativado
            continueBtn.cursor = "pointer";
            continueBtn.mouseEnabled = true;

            continueBtn.on("click", function () {
                if (!gameStarted) {
                    gameStarted = true;
                    isLoadingGame = true; // Marcar que estamos a carregar jogo
                    fadeOutMenu();
                }
            });
        } else {
            // Desativar botão se não há jogo guardado
            continueBtn.gotoAndStop(1); // Frame 2 = desativado
            continueBtn.cursor = "default";
            continueBtn.mouseEnabled = false;
        }
    }

    // Listener para loop da animação do menu
    var buttonsConfigured = false;
    menuInstance.on("tick", function () {
        // Reconfigurar botões quando aparecem no stage (frame 58+)
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
                // Manter o estado correto baseado em se há jogo guardado
                contBtn.gotoAndStop(savedGameExists ? 0 : 1);
                if (contBtn.text) contBtn.text.text = "CONTINUAR";
            }
        }

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

    console.log("[Menu] Fade out...");

    // Fade to black (diminuir alpha)
    createjs.Tween.get(menuInstance)
        .to({ alpha: 0 }, 1000, createjs.Ease.quadIn)
        .call(function () {
            menuInstance.visible = false;
            menuInstance.stop();
            startGameAfterMenu();
        });
}

function startGameAfterMenu() {
    console.log("[ISEP Tycoon] Iniciando jogo...");

    // Carregar jogo guardado se estivermos a continuar
    if (isLoadingGame) {
        if (loadGame()) {
            console.log("[ISEP Tycoon] Jogo carregado do localStorage.");
        } else {
            console.log("[ISEP Tycoon] Falha ao carregar, iniciando novo jogo.");
        }
    }

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

    // 8.1 Atualizar gráficos de todos os edifícios (importante para jogos carregados)
    for (var id in gameState.buildings) {
        updateBuildingGraphics(id);
    }

    // 9. Iniciar Loop de Economia
    startGameLoop();

    // 10. Listener Global de Mouse para o Hover seguir o rato
    setupGlobalMouseMove();

    // 11. Inicializar Carro
    if (window.initCar) initCar();

    // 12. Inicializar Sistema de Inimigos
    if (window.initEnemySystem) initEnemySystem();

    // 13. Iniciar Soundtrack
    initSoundtrack();

    // 14. Iniciar Auto-Save
    startAutoSave();

    console.log("[ISEP Tycoon] Jogo iniciado com sucesso!");
}

function loadGameSounds() {
    // SFX
    createjs.Sound.registerSound("assets/sfx/building_level_up.mp3", "levelUpSound");
    createjs.Sound.registerSound("assets/sfx/wrong.mp3", "wrongSound");

    // Theme Song
    createjs.Sound.registerSound("assets/theme_song.mp3", "themeSong");

    // Soundtrack
    for (var i = 0; i < soundtrackFiles.length; i++) {
        createjs.Sound.registerSound(soundtrackFiles[i], "soundtrack_" + i);
    }
}

function initSoundtrack() {
    // Começar com Soundtrack_1 após 10 segundos
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
    // Delay random entre 1:30 (90s) e 3:00 (180s)
    var delayMs = (90 + Math.random() * 90) * 1000;

    setTimeout(function () {
        // Escolher track random que não seja a mesma
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

// ============================================
// SISTEMA DE SAVE/LOAD
// ============================================

/**
 * Guarda o estado atual do jogo no localStorage
 */
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
        console.log("[ISEP Tycoon] Jogo guardado automaticamente.");
    } catch (e) {
        console.error("[ISEP Tycoon] Erro ao guardar jogo:", e);
    }
}

/**
 * Carrega o estado do jogo a partir do localStorage
 * @returns {boolean} true se carregou com sucesso, false caso contrário
 */
function loadGame() {
    try {
        var saveData = localStorage.getItem(SAVE_KEY);
        if (!saveData) return false;

        var data = JSON.parse(saveData);

        // Restaurar estado do jogo
        gameState.money = data.money || 1000;
        gameState.students = data.students || 0;
        gameState.sustainability = data.sustainability || 0;

        // Restaurar estado dos edifícios
        for (var id in data.buildings) {
            if (gameState.buildings[id]) {
                gameState.buildings[id] = data.buildings[id];
            }
        }

        console.log("[ISEP Tycoon] Jogo carregado com sucesso.");
        return true;
    } catch (e) {
        console.error("[ISEP Tycoon] Erro ao carregar jogo:", e);
        return false;
    }
}

/**
 * Verifica se existe um jogo guardado no localStorage
 * @returns {boolean} true se existe, false caso contrário
 */
function hasSavedGame() {
    try {
        var saveData = localStorage.getItem(SAVE_KEY);
        return saveData !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Remove o jogo guardado do localStorage
 */
function clearSavedGame() {
    try {
        localStorage.removeItem(SAVE_KEY);
        console.log("[ISEP Tycoon] Dados guardados removidos.");
    } catch (e) {
        console.error("[ISEP Tycoon] Erro ao remover dados guardados:", e);
    }
}

/**
 * Inicia o sistema de auto-save
 */
function startAutoSave() {
    if (autoSaveIntervalId) clearInterval(autoSaveIntervalId);
    autoSaveIntervalId = setInterval(saveGame, AUTO_SAVE_INTERVAL);
    console.log("[ISEP Tycoon] Auto-save iniciado (a cada " + (AUTO_SAVE_INTERVAL / 1000) + " segundos).");
}

/**
 * Para o sistema de auto-save
 */
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

// ============================================
// UI & TOOLTIPS
// ============================================
function initUI() {
    uiInstance = findInstanceOnStage("ui_mc");

    if (uiInstance) {
        uiInstance.mouseEnabled = true;
        uiInstance.mouseChildren = true;
        uiInstance.cursor = "pointer";

        // Encontrar alunos_info_mc
        alunosInfoInstance = uiInstance.instance;

        // Fallback: procurar nos children
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

    // Calcular valores actuais (não usar o cached)
    var studentGain = calculateStudentGain();
    var studentLoss = window.getEnemyDamage ? getEnemyDamage() : 0;
    var delta = studentGain - studentLoss;

    // O Animate usa o mesmo campo student_gain_txt para ambos os frames
    if (delta >= 0) {
        alunosInfoInstance.gotoAndStop(0); // Frame 1 = Gain (verde)
        if (alunosInfoInstance.student_gain_txt) {
            alunosInfoInstance.student_gain_txt.text = "+" + delta;
        }
    } else {
        alunosInfoInstance.gotoAndStop(1); // Frame 2 = Loss (vermelho)
        if (alunosInfoInstance.student_gain_txt) {
            alunosInfoInstance.student_gain_txt.text = delta;
        }
    }
}

function updateUI() {
    if (!uiInstance) return;
    if (uiInstance.money_txt) uiInstance.money_txt.text = Math.floor(gameState.money) + "€";
    if (uiInstance.students_txt) uiInstance.students_txt.text = gameState.students + " Alunos";

    // Calcular sustentabilidade dinamicamente
    gameState.sustainability = calculateSustainability();
    if (uiInstance.sustain_txt) uiInstance.sustain_txt.text = gameState.sustainability + "%";
}

function calculateSustainability() {
    var totalPossible = 0;
    var totalAchieved = 0;

    for (var id in buildingsData) {
        var data = buildingsData[id];
        var state = gameState.buildings[id];

        // Só contar edifícios que têm upgrades de sustentabilidade
        if (data.sustain_upgrades && data.sustain_upgrades.length > 0) {
            totalPossible += 3; // Máximo 3 níveis por edifício
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
    createjs.Sound.play("wrongSound", { volume: SFX_VOLUME });
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
        // Desativar hover para estacionamentos já comprados
        var isEstacionamento = id.toLowerCase().includes("estacionamento");
        var isUnlocked = gameState.buildings[id].unlocked;

        if (isEstacionamento && isUnlocked) {
            // Estacionamento comprado - sem efeito de hover
            return;
        }

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
        // Sustentabilidade é calculada dinamicamente, não acumulada

        // Atualizar gráfico se foi upgrade de sustentabilidade
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

// ============================================
// HELPERS GRÁFICOS
// ============================================
/**
 * Atualiza o frame do edifício com base no estado e nível de sustentabilidade.
 * Frame 0: Bloqueado
 * Frame 1: Desbloqueado (Base / Sustentabilidade 0)
 * Frame 2: Sustentabilidade 1
 * Frame 3: Sustentabilidade 2
 * Frame 4: Sustentabilidade 3
 */
function updateBuildingGraphics(id) {
    var mc = findInstanceOnStage(id);
    if (!mc) return;

    var state = gameState.buildings[id];

    if (!state.unlocked) {
        mc.gotoAndStop(0); // Frame 1 (Bloqueado)
    } else {
        // Frame 2 (Base) + Nível de Sustentabilidade (0 a 3)
        var frameIndex = 1 + (state.sustain_level || 0);
        mc.gotoAndStop(frameIndex);
    }
}

/**
 * Para todas as animações do jogo no frame 0
 * Chamado imediatamente quando o jogo carrega, antes do menu
 */
function stopAllBuildingAnimations() {
    // Parar edifícios
    for (var id in buildingsData) {
        var mc = findInstanceOnStage(id);
        if (mc) {
            mc.stop();
            mc.gotoAndStop(0);
        }
    }

    // Parar UI
    var uiMc = findInstanceOnStage("ui_mc");
    if (uiMc) {
        uiMc.stop();
        uiMc.gotoAndStop(0);
    }

    // Parar e esconder painel de upgrades
    var upgradeMc = findInstanceOnStage("upgrade_mc");
    if (upgradeMc) {
        upgradeMc.stop();
        upgradeMc.gotoAndStop(0);
        upgradeMc.x = -800; // Esconder fora do ecrã
    }

    console.log("[ISEP Tycoon] Todas as animações paradas");
}

// ============================================
// ECONOMIA (GAME LOOP)
// ============================================
function startGameLoop() {
    if (gameTickInterval) clearInterval(gameTickInterval);
    gameTickInterval = setInterval(gameTick, TICK_RATE);
}

function gameTick() {
    // NOTA: updateEnemies agora corre no Ticker, não aqui


    // Dinheiro (cada tick)
    var income = gameState.students * INCOME_PER_STUDENT;
    var maintenanceFactor = 1 - (gameState.sustainability / 100);
    var maintenanceCost = (gameState.students * 0.1) * maintenanceFactor;
    var profit = income - maintenanceCost;
    if (profit > 0) {
        gameState.money += profit;
    }

    // Alunos (cada 5 segundos)
    var now = Date.now();
    if (now - lastStudentUpdateTime >= STUDENT_UPDATE_INTERVAL) {
        lastStudentUpdateTime = now;

        // Calcular ganho de alunos base
        var studentGain = calculateStudentGain();

        // Calcular perda por inimigos
        var studentLoss = 0;
        if (window.getEnemyDamage) studentLoss = getEnemyDamage();

        currentStudentDelta = studentGain - studentLoss;
        gameState.students += currentStudentDelta;

        if (gameState.students < 0) gameState.students = 0;

        // Game Over check
        if (gameState.students <= 0 && window.getActiveEnemyCount && getActiveEnemyCount() > 0) {
            gameOver();
        }
    }

    updateUI();

    // Atualizar info de alunos se estiver em hover
    if (isHoveringUI) {
        updateAlunosInfo();
    }
}

function calculateStudentGain() {
    var gain = 0;
    for (var id in gameState.buildings) {
        var b = gameState.buildings[id];
        if (b.unlocked) {
            gain += 0.5; // Reduzido de 1 para 0.5 por edifício
            gain += (b.course_level || 0) * 0.2; // Reduzido de 0.5
            gain += (b.infra_level || 0) * 0.1; // Reduzido de 0.3
        }
    }
    return Math.floor(gain);
}

function gameOver() {
    clearInterval(gameTickInterval);
    stopAutoSave(); // Parar auto-save
    clearSavedGame(); // Limpar dados guardados ao perder
    alert("GAME OVER! Os estudantes abandonaram o ISEP devido à praxe descontrolada!");
    location.reload();
}
