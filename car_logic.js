/**
 * ISEP Tycoon - Car Logic
 */

var carInstance = null;
var limiteInstance = null;
var carOn = false;

var soundIds = {
    start: "carStart",
    stop: "carStop",
    idle: "carIdle",
    accel: "carAccel",
    horn: "carHorn"
};

var BASE_VOL = 0.01;
var IDLE_VOL = 0.01;
var MOVE_VOL = 0.01;

var soundInstances = {
    idleLoop1: null,
    idleLoop2: null,
    currentLoop: null,
    accel: null
};

var carStats = {
    speed: 0,
    maxSpeed: 8,
    acceleration: 0.4,
    friction: 0.85,
    rotationSpeed: 5,
    angleOffset: 0
};

var keys = { up: false, down: false, left: false, right: false };
var currentAnimState = "none";
var wasMoving = false;

function initCar() {
    console.log("[Car] Initializing...");

    var sfxPath = "assets/sfx/car/";
    createjs.Sound.registerSound(sfxPath + "Car_Engine_Start_Up.ogg", soundIds.start);
    createjs.Sound.registerSound(sfxPath + "Car_Engine_Turning_Off.ogg", soundIds.stop);
    createjs.Sound.registerSound(sfxPath + "Car_Engine_Loop.ogg", soundIds.idle);
    createjs.Sound.registerSound(sfxPath + "Car_Acceleration.ogg", soundIds.accel);
    createjs.Sound.registerSound(sfxPath + "Car_Horn.ogg", soundIds.horn);

    carInstance = findInstanceOnStage("carro_mc");
    limiteInstance = findInstanceOnStage("limite_mc");

    if (!limiteInstance) {
        var lib = getLib();
        if (lib && lib.limite_mc) {
            var constructor = lib.limite_mc;
            for (var i = 0; i < exportRoot.children.length; i++) {
                if (exportRoot.children[i] instanceof constructor) {
                    limiteInstance = exportRoot.children[i];
                    break;
                }
            }
        }
    }
    if (limiteInstance) limiteInstance.visible = false;

    if (!carInstance) {
        var lib = getLib();
        if (lib && lib.carro_mc) {
            carInstance = new lib.carro_mc();
            carInstance.name = "carro_mc";
            carInstance.x = 1000;
            carInstance.y = 800;
            exportRoot.addChild(carInstance);
        } else return;
    }

    carInstance.stop();
    carInstance.gotoAndStop(0);
    currentAnimState = "off";
    carOn = false;
    wasMoving = false;
    stopAllCarSounds();

    window.addEventListener("keydown", handleCarKeyDown);
    window.addEventListener("keyup", handleCarKeyUp);
    createjs.Ticker.addEventListener("tick", updateCar);

    console.log("[Car] Ready");
}

function handleCarKeyDown(e) {
    var key = e.key.toLowerCase();
    if (key === "e") { toggleCarEngine(); return; }
    if (key === "h") { playHorn(); return; }
    switch (key) {
        case "w": case "arrowup": keys.up = true; break;
        case "s": case "arrowdown": keys.down = true; break;
        case "a": case "arrowleft": keys.left = true; break;
        case "d": case "arrowright": keys.right = true; break;
    }
}

function handleCarKeyUp(e) {
    switch (e.key.toLowerCase()) {
        case "w": case "arrowup": keys.up = false; break;
        case "s": case "arrowdown": keys.down = false; break;
        case "a": case "arrowleft": keys.left = false; break;
        case "d": case "arrowright": keys.right = false; break;
    }
}

function playHorn() {
    if (!carOn) return;
    createjs.Sound.play(soundIds.horn, { volume: BASE_VOL });
}

function toggleCarEngine() {
    carOn = !carOn;
    console.log("[Car] Engine:", carOn ? "ON" : "OFF");

    if (carOn) {
        createjs.Sound.play(soundIds.start, { volume: BASE_VOL });

        setTimeout(function () {
            if (carOn) {
                soundInstances.currentLoop = createjs.Sound.play(soundIds.idle, { loop: -1, volume: IDLE_VOL });
                setCarAnim("idle");
            }
        }, 1500);

    } else {
        carStats.speed = 0;
        setCarAnim("off");

        stopLoopSound();
        if (soundInstances.accel) soundInstances.accel.stop();

        createjs.Sound.play(soundIds.stop, { volume: BASE_VOL });
    }
}

function stopLoopSound() {
    if (soundInstances.currentLoop) {
        // fade out instead of hard cut
        createjs.Tween.get(soundInstances.currentLoop, { override: true })
            .to({ volume: 0 }, 300)
            .call(function () { this.stop(); });
    }
}

function stopAllCarSounds() {
    createjs.Sound.stop();
    soundInstances.currentLoop = null;
    soundInstances.accel = null;
}

function setCarAnim(state) {
    if (!carInstance || currentAnimState === state) return;
    currentAnimState = state;
    if (state === "off") carInstance.gotoAndStop(0);
}

function updateCar(event) {
    if (!carInstance || (event && event.paused)) return;
    if (!carOn) return;

    // physics
    if (keys.up) carStats.speed += carStats.acceleration;
    else if (keys.down) carStats.speed -= carStats.acceleration;
    else carStats.speed *= carStats.friction;

    if (carStats.speed > carStats.maxSpeed) carStats.speed = carStats.maxSpeed;
    if (carStats.speed < -carStats.maxSpeed / 2) carStats.speed = -carStats.maxSpeed / 2;
    if (Math.abs(carStats.speed) < 0.1) carStats.speed = 0;

    var isMovingNow = (Math.abs(carStats.speed) > 0.5);

    // rotation
    if (isMovingNow) {
        var direction = carStats.speed > 0 ? 1 : -1;
        if (keys.left) carInstance.rotation -= carStats.rotationSpeed * direction;
        if (keys.right) carInstance.rotation += carStats.rotationSpeed * direction;
    }

    // audio transitions
    if (isMovingNow && !wasMoving) {
        // started moving
        soundInstances.accel = createjs.Sound.play(soundIds.accel, { volume: MOVE_VOL * 0.7 });

        if (soundInstances.currentLoop) {
            createjs.Tween.get(soundInstances.currentLoop, { override: true })
                .to({ volume: MOVE_VOL }, 1200, createjs.Ease.quadOut);
        }
    }
    else if (!isMovingNow && wasMoving) {
        // stopped moving
        if (soundInstances.accel) {
            createjs.Tween.get(soundInstances.accel, { override: true }).to({ volume: 0 }, 300).call(function () { this.stop(); });
        }

        if (soundInstances.currentLoop) {
            createjs.Tween.get(soundInstances.currentLoop, { override: true })
                .to({ volume: IDLE_VOL }, 800, createjs.Ease.quadOut);
        }
    }

    wasMoving = isMovingNow;

    // animation
    if (isMovingNow) {
        if (currentAnimState !== "moving") setCarAnim("moving");
        if (carInstance.currentFrame < 16 || carInstance.currentFrame > 37) carInstance.gotoAndPlay(16);
        else if (carInstance.currentFrame >= 37) carInstance.gotoAndPlay(16);
    } else {
        if (currentAnimState !== "idle") setCarAnim("idle");
        if (carInstance.currentFrame < 2 || carInstance.currentFrame > 15) carInstance.gotoAndPlay(2);
        else if (carInstance.currentFrame >= 15) carInstance.gotoAndPlay(2);
    }

    // movement
    var angleRad = (carInstance.rotation + carStats.angleOffset) * (Math.PI / 180);
    var nextX = carInstance.x + Math.cos(angleRad) * carStats.speed;
    var nextY = carInstance.y + Math.sin(angleRad) * carStats.speed;

    if (canMoveTo(nextX, nextY)) {
        carInstance.x = nextX;
        carInstance.y = nextY;
    } else {
        // collision - slow down and try smaller step
        carStats.speed *= 0.3;
        var step = carStats.speed * 0.1;
        var sx = carInstance.x + Math.cos(angleRad) * step;
        var sy = carInstance.y + Math.sin(angleRad) * step;
        if (canMoveTo(sx, sy)) {
            carInstance.x = sx;
            carInstance.y = sy;
        }
    }
}

function canMoveTo(nx, ny) {
    var stagePt = exportRoot.localToGlobal(nx, ny);

    // check boundary
    if (limiteInstance) {
        var pt = limiteInstance.globalToLocal(stagePt.x, stagePt.y);
        if (limiteInstance.hitTest(pt.x, pt.y)) return false;
    } else {
        if (nx < 0 || nx > 1920 || ny < 0 || ny > 1080) return false;
    }

    // check buildings (skip parking lots)
    if (typeof buildingsData !== 'undefined' && buildingsData) {
        for (var id in buildingsData) {
            if (id.toLowerCase().includes("estacionamento")) continue;
            var b = findInstanceOnStage(id);
            if (b) {
                var bp = b.globalToLocal(stagePt.x, stagePt.y);
                if (b.hitTest(bp.x, bp.y)) return false;
            }
        }
    }
    return true;
}
