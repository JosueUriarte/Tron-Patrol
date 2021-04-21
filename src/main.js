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