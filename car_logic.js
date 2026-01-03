/**
 * ISEP Tycoon - Car Logic
 * Sistema de condução para o carro_mc
 */

var carInstance = null;
var limiteInstance = null;

// Configurações do Carro
var carStats = {
    speed: 0,
    maxSpeed: 8,
    acceleration: 0.4,
    friction: 0.85,
    rotationSpeed: 5,
    angleOffset: 0
};

// Estado das teclas
var keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

function initCar() {
    console.log("[Car Logic] Inicializando carro...");

    // Tentar encontrar o carro e o elemento "limite_mc"
    carInstance = findInstanceOnStage("carro_mc");
    limiteInstance = findInstanceOnStage("limite_mc");

    // Fallback para encontrar por tipo se o nome de instância falhar
    if (!limiteInstance) {
        var lib = getLib();
        if (lib && lib.limite_mc) {
            var constructor = lib.limite_mc;
            for (var i = 0; i < exportRoot.children.length; i++) {
                var child = exportRoot.children[i];
                if (child instanceof constructor) {
                    limiteInstance = child;
                    break;
                }
            }
        }
    }

    if (limiteInstance) {
        limiteInstance.visible = false; // Tornar invisível como solicitado
        console.log("[Car Logic] Limite encontrado e ocultado.");
    }

    if (!carInstance) {
        var lib = getLib();
        if (lib && lib.carro_mc) {
            carInstance = new lib.carro_mc();
            carInstance.name = "carro_mc";
            carInstance.x = 1000;
            carInstance.y = 800;
            exportRoot.addChild(carInstance);
        } else {
            console.error("[Car Logic] Linkage 'carro_mc' não encontrado!");
            return;
        }
    }

    // Configuração inicial
    carInstance.stop();

    // Listeners de teclado
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Adicionar ao Tick do CreateJS
    createjs.Ticker.addEventListener("tick", updateCar);
}

function handleKeyDown(e) {
    switch (e.key.toLowerCase()) {
        case "w": case "arrowup": keys.up = true; break;
        case "s": case "arrowdown": keys.down = true; break;
        case "a": case "arrowleft": keys.left = true; break;
        case "d": case "arrowright": keys.right = true; break;
    }
}

function handleKeyUp(e) {
    switch (e.key.toLowerCase()) {
        case "w": case "arrowup": keys.up = false; break;
        case "s": case "arrowdown": keys.down = false; break;
        case "a": case "arrowleft": keys.left = false; break;
        case "d": case "arrowright": keys.right = false; break;
    }
}

function updateCar(event) {
    if (!carInstance || (event && event.paused)) return;

    // 1. Aceleração e Travagem
    if (keys.up) {
        carStats.speed += carStats.acceleration;
    } else if (keys.down) {
        carStats.speed -= carStats.acceleration;
    } else {
        carStats.speed *= carStats.friction;
    }

    // Limitar velocidade
    if (carStats.speed > carStats.maxSpeed) carStats.speed = carStats.maxSpeed;
    if (carStats.speed < -carStats.maxSpeed / 2) carStats.speed = -carStats.maxSpeed / 2;
    if (Math.abs(carStats.speed) < 0.1) carStats.speed = 0;

    // 2. Rotação (apenas se estiver em movimento)
    if (Math.abs(carStats.speed) > 0.5) {
        var direction = carStats.speed > 0 ? 1 : -1;
        if (keys.left) carInstance.rotation -= carStats.rotationSpeed * direction;
        if (keys.right) carInstance.rotation += carStats.rotationSpeed * direction;
    }

    // 3. Movimento (Vetor baseado no ângulo)
    var angleRad = (carInstance.rotation + carStats.angleOffset) * (Math.PI / 180);
    var nextX = carInstance.x + Math.cos(angleRad) * carStats.speed;
    var nextY = carInstance.y + Math.sin(angleRad) * carStats.speed;

    // 4. Colisões
    if (canMoveTo(nextX, nextY)) {
        carInstance.x = nextX;
        carInstance.y = nextY;
    } else {
        // Reduzir velocidade em colisão
        carStats.speed *= 0.3;

        // Tentar um movimento menor para não ficar preso
        var step = carStats.speed * 0.1;
        var smallStepX = carInstance.x + Math.cos(angleRad) * step;
        var smallStepY = carInstance.y + Math.sin(angleRad) * step;
        if (canMoveTo(smallStepX, smallStepY)) {
            carInstance.x = smallStepX;
            carInstance.y = smallStepY;
        }
    }
}

function canMoveTo(nx, ny) {
    // Converter nx, ny (que estão no exportRoot) para coordenadas globais do Stage
    var stagePt = exportRoot.localToGlobal(nx, ny);

    // a) Limite de contenção (elemento "limite_mc")
    // Se o limite for uma LINHA (borda), o carro NÃO PODE tocar nela.
    if (limiteInstance) {
        var pt = limiteInstance.globalToLocal(stagePt.x, stagePt.y);
        if (limiteInstance.hitTest(pt.x, pt.y)) {
            // Se hitTest for verdadeiro, bateu na linha do limite
            return false;
        }
    } else {
        if (nx < 0 || nx > 1920 || ny < 0 || ny > 1080) return false;
    }

    // b) Colisão com Edifícios
    if (typeof buildingsData !== 'undefined' && buildingsData) {
        for (var id in buildingsData) {
            if (id.toLowerCase().includes("estacionamento")) continue;

            var building = findInstanceOnStage(id);
            if (building) {
                var bPt = building.globalToLocal(stagePt.x, stagePt.y);
                if (building.hitTest(bPt.x, bPt.y)) {
                    // console.log("Bloqueado pelo edifício:", id);
                    return false;
                }
            }
        }
    }

    return true;
}
