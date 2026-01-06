/**
 * ISEP Tycoon - Enemy Logic
 * Sistema de inimigos (Praxe) com spawn dinâmico
 */

var enemyConfig = null;
var activeEnemies = [];
var lastSpawnTime = 0;
var enemyIdCounter = 0;

// Carregar config
function loadEnemyConfig(callback) {
    var req = new XMLHttpRequest();
    req.open("GET", "enemy.json", true);
    req.onload = function () {
        if (req.status === 200) {
            enemyConfig = JSON.parse(req.responseText);
            console.log("[Enemy] Config loaded.");
            if (callback) callback();
        }
    };
    req.send();
}

function initEnemySystem() {
    loadEnemyConfig(function () {
        console.log("[Enemy] System ready.");

        // Adicionar ao Ticker para updates a 60fps
        createjs.Ticker.addEventListener("tick", function (event) {
            if (!event.paused) {
                updateEnemies();
                checkEnemyCollisions();
            }
        });
    });
}

function getProgressionLevel() {
    if (!gameState || !gameState.buildings) return 0;
    var level = 0;
    for (var id in gameState.buildings) {
        var b = gameState.buildings[id];
        if (b.unlocked) level++;
        level += (b.course_level || 0) + (b.infra_level || 0) + (b.sustain_level || 0);
    }
    return level;
}

function getCurrentSpawnRate() {
    if (!enemyConfig) return 999999;
    var base = enemyConfig.base_stats.spawn_rate_ms;
    var reduction = getProgressionLevel() * enemyConfig.progression.spawn_rate_reduction_per_building;
    var rate = base - reduction;
    return Math.max(rate, enemyConfig.progression.spawn_rate_min_ms);
}

function getMaxEnemies() {
    if (!enemyConfig) return 1;
    var max = enemyConfig.base_stats.max_enemies;
    var thresholds = enemyConfig.progression.max_enemies_increase_at_students;
    for (var i = 0; i < thresholds.length; i++) {
        if (gameState.students >= thresholds[i]) max++;
    }
    return max;
}

function canSpawnEnemy() {
    if (!enemyConfig) return false;
    if (gameState.students < enemyConfig.base_stats.min_students_to_spawn) return false;
    if (activeEnemies.length >= getMaxEnemies()) return false;

    var now = Date.now();
    if (now - lastSpawnTime < getCurrentSpawnRate()) return false;

    return true;
}

function spawnEnemy() {
    if (!canSpawnEnemy()) return;

    if (!window.lib || !window.lib.praxe_mc) {
        console.log("[Enemy] lib.praxe_mc not available");
        return;
    }

    // Obter spawn point inteligente
    var point = getSmartSpawnPoint();
    if (!point) {
        console.log("[Enemy] No valid spawn point available");
        return;
    }

    // Create instance
    var enemy = new window.lib.praxe_mc();
    enemy.name = "praxe_" + (++enemyIdCounter);
    enemy.x = point.x;
    enemy.y = point.y;
    enemy._spawnPoint = point; // Guardar referência ao spawn point

    // Parar animação automática
    enemy.stop();
    enemy.gotoAndStop(0);

    // Estado do inimigo
    enemy._state = "idle";
    enemy._frame = 0;

    // Adicionar inimigo ao stage
    exportRoot.addChild(enemy);

    activeEnemies.push(enemy);
    lastSpawnTime = Date.now();

    console.log("[Enemy] Spawned at", point.x, point.y);
}

function getSmartSpawnPoint() {
    var allPoints = enemyConfig.spawn_points;

    // Filtrar pontos ocupados
    var availablePoints = allPoints.filter(function (point) {
        for (var i = 0; i < activeEnemies.length; i++) {
            var enemy = activeEnemies[i];
            if (enemy._spawnPoint && enemy._spawnPoint.x === point.x && enemy._spawnPoint.y === point.y) {
                return false;
            }
        }
        return true;
    });

    if (availablePoints.length === 0) return null;

    // Posição do carro (ou centro se não existir)
    var carX = window.carInstance ? window.carInstance.x : 960;
    var carY = window.carInstance ? window.carInstance.y : 540;

    // Calcular distância de cada ponto ao carro
    var pointsWithDistance = availablePoints.map(function (point) {
        var dx = point.x - carX;
        var dy = point.y - carY;
        return {
            point: point,
            distance: Math.sqrt(dx * dx + dy * dy)
        };
    });

    // Ordenar por distância (mais longe primeiro)
    pointsWithDistance.sort(function (a, b) {
        return b.distance - a.distance;
    });

    // Excluir os 3 mais próximos (nunca spawnar lá)
    var excludeCount = Math.min(3, Math.floor(pointsWithDistance.length / 2));
    var validPoints = pointsWithDistance.slice(0, pointsWithDistance.length - excludeCount);

    if (validPoints.length === 0) return null;

    // 80% - escolher dos 3 mais distantes
    // 20% - escolher random dos restantes válidos
    var chosen;
    if (Math.random() < 0.8) {
        // Top 3 mais distantes
        var topCount = Math.min(3, validPoints.length);
        var topPoints = validPoints.slice(0, topCount);
        chosen = topPoints[Math.floor(Math.random() * topPoints.length)];
    } else {
        // Random dos válidos (excluindo os 3 mais próximos)
        chosen = validPoints[Math.floor(Math.random() * validPoints.length)];
    }

    return chosen.point;
}

function updateEnemies() {
    // Tentar spawn
    spawnEnemy();

    // Atualizar cada inimigo
    for (var i = activeEnemies.length - 1; i >= 0; i--) {
        var enemy = activeEnemies[i];
        updateSingleEnemy(enemy, i);
    }
}

function updateSingleEnemy(enemy, index) {
    if (enemy._state === "idle") {
        // Loop idle: frames 0-29
        enemy._frame++;
        if (enemy._frame > 29) enemy._frame = 0;
        enemy.gotoAndStop(enemy._frame);
    }
    else if (enemy._state === "dying") {
        // Morte: frames 30-59
        enemy._frame++;
        enemy.gotoAndStop(enemy._frame);

        if (enemy._frame >= 59) {
            enemy._state = "dead";
            enemy.visible = false;
            if (enemy.parent) enemy.parent.removeChild(enemy);
            activeEnemies.splice(index, 1);
        }
    }
}

function checkEnemyCollisions() {
    // Só verificar se o carro está ligado e em movimento
    if (!window.carInstance || !window.carOn) return;
    if (Math.abs(window.carStats.speed) < 0.2) return;

    // Usar a mesma lógica que funciona para edifícios
    var stagePt = exportRoot.localToGlobal(carInstance.x, carInstance.y);

    for (var i = 0; i < activeEnemies.length; i++) {
        var enemy = activeEnemies[i];
        if (enemy._state !== "idle") continue;

        var pt = enemy.globalToLocal(stagePt.x, stagePt.y);
        if (enemy.hitTest(pt.x, pt.y)) {
            killEnemy(enemy);
        }
    }
}

function killEnemy(enemy) {
    if (enemy._state !== "idle") return;
    enemy._state = "dying";
    enemy._frame = 30;
    enemy.gotoAndStop(enemy._frame);
}

function getActiveEnemyCount() {
    return activeEnemies.length;
}

function getEnemyDamage() {
    if (!enemyConfig) return 0;
    return activeEnemies.length * enemyConfig.base_stats.damage_per_enemy;
}

