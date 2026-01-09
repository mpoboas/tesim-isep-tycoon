# ISEP Tycoon - Project Overview

> 🎮 A campus management tycoon game built with Adobe Animate and CreateJS, set at ISEP (Instituto Superior de Engenharia do Porto).

---

## 📋 Table of Contents

1. [Project Summary](#project-summary)
2. [Technology Stack](#technology-stack)
3. [Directory Structure](#directory-structure)
4. [Architecture Overview](#architecture-overview)
5. [Core Systems](#core-systems)
6. [Data Files](#data-files)
7. [Audio System](#audio-system)
8. [Game Flow](#game-flow)
9. [Key Functions Reference](#key-functions-reference)

---

## 🎯 Project Summary

**ISEP Tycoon** is an idle/clicker tycoon game where players manage and expand the ISEP campus. Players can:

- 🏢 **Purchase buildings** (Library, Secretary, Engineering departments, etc.)
- ⬆️ **Upgrade buildings** with three categories:
  - 📚 **Course upgrades** - Improve academic offerings
  - 🏗️ **Infrastructure upgrades** - Improve facilities
  - 🌱 **Sustainability upgrades** - Increase eco-friendliness
- 👨‍🎓 **Attract students** - More buildings and upgrades = more students
- 💰 **Earn money** - Students generate income per tick
- 🚗 **Drive a car** - Mini-game with WASD/Arrow controls
- ⚔️ **Fight enemies** - "Praxe" enemies spawn and can be run over with the car

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Adobe Animate** | Visual design & animation authoring |
| **CreateJS** | HTML5 Canvas rendering, sound, tweens |
| **JavaScript (ES5)** | Game logic and systems |
| **HTML5 Canvas** | Rendering surface |
| **JSON** | Data configuration (buildings, enemies) |

### CreateJS Modules Used:
- `createjs.Stage` - Main rendering stage
- `createjs.Ticker` - Game loop (60fps)
- `createjs.Tween` - Animations and transitions
- `createjs.Sound` - Audio playback
- `createjs.LoadQueue` - Asset loading

---

## 📁 Directory Structure

```
tesim-isep-tycoon/
├── index.html              # Main game HTML (responsive wrapper)
├── isep_game.html          # Adobe Animate default export (unused)
├── isep_game.js            # Adobe Animate exported animations/graphics
├── game_logic.js           # Core game systems (economy, UI, upgrades)
├── car_logic.js            # Car driving mini-game
├── enemy_logic.js          # Enemy spawn and collision system
├── buildings.json          # Building definitions and upgrades
├── enemy.json              # Enemy spawn configuration
├── README.md               # Basic readme
├── PROJECT_OVERVIEW.md     # This file
│
├── assets/
│   ├── favicon.png         # Browser tab icon
│   ├── logo.png            # ISEP logo for header
│   ├── menu.png            # Main menu background
│   ├── theme_song.mp3      # Menu theme music
│   │
│   ├── sfx/                # Sound effects
│   │   ├── building_level_up.mp3
│   │   ├── wrong.mp3
│   │   ├── death.mp3       # Enemy death sound
│   │   └── car/            # Car-related sounds
│   │       ├── Car_Engine_Start_Up.ogg
│   │       ├── Car_Engine_Turning_Off.ogg
│   │       ├── Car_Engine_Loop.ogg
│   │       ├── Car_Acceleration.ogg
│   │       └── Car_Horn.ogg
│   │
│   └── soundtrack/         # Background music tracks
│       ├── Soundtrack_1.mp3
│       ├── Soundtrack_2.mp3
│       ├── Soundtrack_3.mp3
│       └── Soundtrack_4.mp3
│
├── images/                 # Sprite atlases (auto-generated)
│   ├── isep_game_atlas_1.png
│   ├── isep_game_atlas_2.png
│   ├── isep_game_atlas_3.png
│   ├── isep_game_atlas_4.png
│   ├── isep_game_atlas_5.png
│   └── praxe_mc.png        # Enemy sprite sheet
│
├── isep_game.fla           # Adobe Animate source file
└── RECOVER_isep_game.fla   # Backup FLA file
```

---

## 🏗️ Architecture Overview

### Initialization Flow

```
index.html
    │
    ├── Load CreateJS library
    ├── Load isep_game.js (Animate export)
    ├── Load game_logic.js
    ├── Load car_logic.js
    ├── Load enemy_logic.js
    │
    └── init() ─────────────────────────────────────┐
         │                                          │
         ├── Create LoadQueue                       │
         ├── Load sprite atlases                    │
         │                                          │
         └── handleComplete() ──────────────────────┤
              │                                     │
              ├── Create exportRoot (main timeline) │
              ├── Create Stage                      │
              ├── Setup responsive resize           │
              │                                     │
              └── initGame() ───────────────────────┘
                   │
                   ├── loadGameSounds()
                   ├── loadBuildingsData()
                   ├── initGameState()
                   ├── stopAllBuildingAnimations()
                   └── showMainMenu()
                        │
                        └── [User clicks New/Continue]
                             │
                             └── startGameAfterMenu()
                                  │
                                  ├── initAlertPanel()
                                  ├── initHoverTooltip()
                                  ├── initUpgradePanel()
                                  ├── initUI()
                                  ├── initBuildings()
                                  ├── startGameLoop()
                                  ├── initCar()
                                  ├── initEnemySystem()
                                  ├── initSoundtrack()
                                  └── startAutoSave()
```

---

## 🎮 Core Systems

### 1. Game State (`gameState`)

```javascript
var gameState = {
    money: 1000,          // Starting currency
    students: 0,          // Student count
    sustainability: 0,    // Calculated from upgrades (0-100%)
    buildings: {
        // Dynamic - populated from buildings.json
        "biblioteca_mc": {
            unlocked: false,
            course_level: 0,   // 0-3
            infra_level: 0,    // 0-3
            sustain_level: 0   // 0-3
        },
        // ... more buildings
    }
};
```

### 2. Economy System

**Income Formula (per tick, every 1000ms):**
```javascript
income = students × INCOME_PER_STUDENT (0.2)
maintenanceCost = (students × 0.1) × (1 - sustainability/100)
profit = income - maintenanceCost
```

**Student Gain (every 5 seconds):**
```javascript
gain = 0
for each unlocked building:
    gain += 0.5
    gain += course_level × 0.2
    gain += infra_level × 0.1
```

### 3. Building System

Buildings have multiple frames representing their state:
- **Frame 0**: Locked (greyed out)
- **Frame 1**: Unlocked (base appearance)
- **Frame 2-4**: Sustainability levels 1-3 (progressively greener)

**Building Types:**
| Type | Description |
|------|-------------|
| Academic | B, C, F, G, H, I, J buildings |
| Services | Biblioteca, Secretaria, Bar, Auditório |
| Parking | Estacionamento_* (no upgrades) |

### 4. Upgrade System

Each building (except parking lots) has 3 upgrade categories with 3 levels each:

```json
{
    "course_upgrades": [
        { "title": "...", "desc": "...", "base_cost": 100, "students_bonus": 10 },
        { "title": "...", "desc": "...", "base_cost": 250, "students_bonus": 25 },
        { "title": "...", "desc": "...", "base_cost": 500, "students_bonus": 50 }
    ],
    "infra_upgrades": [ /* similar */ ],
    "sustain_upgrades": [ /* similar, but with sustain_bonus */ ]
}
```

**Cost Formula:**
```javascript
cost = base_cost × GLOBAL_MULTIPLIER × cost_multiplier
```

### 5. Save System

- **Auto-save**: Every 15 seconds to `localStorage`
- **Key**: `isep_tycoon_save`
- **Data saved**: money, students, sustainability, buildings state, timestamp

### 6. Car System (`car_logic.js`)

**Controls:**
| Key | Action |
|-----|--------|
| E | Toggle engine on/off |
| W / ↑ | Accelerate forward |
| S / ↓ | Reverse |
| A / ← | Turn left |
| D / → | Turn right |
| H | Horn |

**Physics:**
```javascript
carStats = {
    speed: 0,
    maxSpeed: 8,
    acceleration: 0.4,
    friction: 0.85,
    rotationSpeed: 5
}
```

**Collision Detection:**
- Uses `limite_mc` invisible shape for boundaries
- Collides with buildings (except parking lots)
- Can run over enemies

### 7. Enemy System (`enemy_logic.js`)

**Enemy Type:** "Praxe" (hazing tradition enemies)

**Spawn Logic:**
- Requires minimum 100 students
- Spawn rate decreases as player progresses
- Max enemies increase at student thresholds (50, 100)
- Smart spawn: avoids spawning near car

**Enemy States:**
| State | Frames | Description |
|-------|--------|-------------|
| idle | 0-29 | Looping idle animation |
| dying | 30-59 | Death animation |
| dead | - | Removed from stage |

**Damage:**
- Each active enemy causes student loss (10 per enemy per 5 seconds)

---

## 📊 Data Files

### buildings.json

Defines all 18 buildings with their properties:

```json
{
    "building_id_mc": {
        "title": "Display Name",
        "unlock_cost": 200,
        "cost_multiplier": 1.1,
        "students_bonus": 10,  // Optional, for parking lots
        "course_upgrades": [...],
        "infra_upgrades": [...],
        "sustain_upgrades": [...]
    }
}
```

### enemy.json

Configures enemy system:

```json
{
    "spawn_points": [
        { "x": 424, "y": 808 },
        // ... 9 total spawn points
    ],
    "base_stats": {
        "spawn_rate_ms": 30000,
        "damage_per_enemy": 10,
        "min_students_to_spawn": 100,
        "max_enemies": 1
    },
    "progression": {
        "spawn_rate_reduction_per_building": 500,
        "spawn_rate_min_ms": 5000,
        "max_enemies_increase_at_students": [50, 100]
    }
}
```

---

## 🔊 Audio System

### Sound Registration

```javascript
// SFX
createjs.Sound.registerSound("assets/sfx/building_level_up.mp3", "levelUpSound");
createjs.Sound.registerSound("assets/sfx/wrong.mp3", "wrongSound");
createjs.Sound.registerSound("assets/sfx/death.mp3", "deathSound");

// Theme (menu)
createjs.Sound.registerSound("assets/theme_song.mp3", "themeSong");

// Soundtrack (in-game)
createjs.Sound.registerSound("assets/soundtrack/Soundtrack_1.mp3", "soundtrack_0");
// ... etc
```

### Volume Levels

| Sound Type | Volume |
|------------|--------|
| Soundtrack | 0.02 (2%) |
| SFX | 0.2 (20%) |
| Car sounds | 0.01 (1%) |

### Theme Song Autoplay Workaround

Due to browser autoplay policies, the theme song is triggered on first user interaction:

```javascript
function setupThemeSongTrigger() {
    function startThemeSong() {
        if (themeSongStarted) return;
        themeSongStarted = true;
        
        // Resume AudioContext if suspended
        if (createjs.WebAudioPlugin.context.state === 'suspended') {
            createjs.WebAudioPlugin.context.resume();
        }
        
        createjs.Sound.play("themeSong", { volume: 0.02, loop: -1 });
        
        // Cleanup listeners
        document.removeEventListener('click', startThemeSong);
        document.removeEventListener('keydown', startThemeSong);
        document.removeEventListener('touchstart', startThemeSong);
    }
    
    document.addEventListener('click', startThemeSong);
    document.addEventListener('keydown', startThemeSong);
    document.addEventListener('touchstart', startThemeSong);
}
```

---

## 🔄 Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      MAIN MENU                              │
│  ┌─────────────┐    ┌─────────────┐                        │
│  │  NEW GAME   │    │  CONTINUE   │ (if save exists)       │
│  └─────────────┘    └─────────────┘                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      GAME LOOP                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  gameTick() - Every 1000ms                          │   │
│  │  ├── Calculate income                               │   │
│  │  ├── Apply maintenance cost                         │   │
│  │  ├── Every 5s: Update student count                 │   │
│  │  ├── Check for Game Over                            │   │
│  │  └── Update UI                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Ticker (60fps)                                     │   │
│  │  ├── updateCar() - Physics & animation              │   │
│  │  ├── updateEnemies() - Spawn & animate              │   │
│  │  └── checkEnemyCollisions() - Car vs enemies        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Auto-Save - Every 15 seconds                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      GAME OVER                              │
│  (When students reach 0 with active enemies)               │
│  └── Clear save, reload page                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Key Functions Reference

### game_logic.js

| Function | Description |
|----------|-------------|
| `initGame()` | Entry point, loads sounds and data |
| `showMainMenu()` | Displays main menu with New/Continue options |
| `startGameAfterMenu()` | Initializes all game systems |
| `gameTick()` | Main economy loop (1000ms) |
| `handleBuildingClick(id, mc)` | Purchase or open upgrade panel |
| `buyUpgrade(type)` | Purchase an upgrade |
| `updateUI()` | Refresh money, students, sustainability display |
| `updateBuildingGraphics(id)` | Update building sprite frame |
| `saveGame()` / `loadGame()` | Persist/restore game state |
| `setupThemeSongTrigger()` | Browser autoplay workaround |

### car_logic.js

| Function | Description |
|----------|-------------|
| `initCar()` | Initialize car system and controls |
| `toggleCarEngine()` | Turn car on/off |
| `updateCar()` | Physics update (60fps) |
| `canMoveTo(x, y)` | Collision detection |

### enemy_logic.js

| Function | Description |
|----------|-------------|
| `initEnemySystem()` | Load config and start enemy ticker |
| `spawnEnemy()` | Create new enemy at smart location |
| `updateEnemies()` | Animate all enemies |
| `checkEnemyCollisions()` | Detect car hitting enemies |
| `killEnemy(enemy)` | Trigger death animation |
| `getEnemyDamage()` | Calculate student loss |

---

## 🎨 UI Components (MovieClips)

| MovieClip | Purpose |
|-----------|---------|
| `menu_mc` | Main menu overlay |
| `ui_mc` | Top-left stats (money, students, sustainability) |
| `upgrade_mc` | Upgrade panel (slides in from left) |
| `alert_mc` | "Not enough money" notification |
| `hover_mc` | Building tooltip (follows mouse) |
| `carro_mc` | Driveable car |
| `praxe_mc` | Enemy character |
| `limite_mc` | Invisible collision boundary |
| `*_mc` | Various building MovieClips |

---

## 🚀 Running the Project

1. Open `index.html` in a web browser (use a local server for best results)
2. The game will load the Adobe Animate assets
3. Click anywhere to start the theme music
4. Select "New Game" or "Continue"

**Recommended Local Server:**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

---

## 📝 Notes

- The game is designed for **16:9 aspect ratio** (1920×1080)
- Mobile devices in portrait mode see a "rotate device" message
- All animations are created in Adobe Animate and exported to CreateJS
- The `isep_game.js` file is auto-generated and should not be manually edited

---

*Last updated: January 2026*
