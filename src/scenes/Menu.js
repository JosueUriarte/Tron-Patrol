//const { Phaser } = require("../../lib/phaser");

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load image
        this.load.image('background', './assets/TronTitleScreen.png');

        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/TronExplode.wav');
        this.load.audio('sfx_rocket', './assets/TronCycleGo.wav');

        // load main music
        this.load.audio("mainMusic",'./assets/TronTheme.wav');
    }

    create() {
    
        //Background
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0,0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
      }

        
}