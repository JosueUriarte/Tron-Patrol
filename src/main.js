// TRON PATROL
// CREATED BY JOSUE URIARTE REYES
// Time to create this game: TOO LONG!!! (around 2-3 days on and off ~~~ 46 hrs??)

// POINT BREAKDOWN
// Randomize player position after each reset (5)
// Allow player to control rocket when fired (5)
// Added a coundown timer (5) (Kinda jank but it works)
// Added Option to select player mode in menu (10)
// Added a trail that destroys enemies (30) (took me forever to implement)
// Simultaneous Multiplayer Added (30)
// Redesigned the game's artwork, UI, and Sound (60)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play ],
    physics: {
        default: "arcade",
        arcade:{
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

// set the UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// set speed for background
let starSpeed = 1;

// reserve keyboard bindings
let keyM, keyB, keyR, keyLEFT, keyRIGHT, keyA, keyD, key1, key2;