// TRON PATROL
// CREATED BY JOSUE URIARTE REYES more info in main.js file

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load image
        this.load.image('background', './assets/TronTitleScreen.png');
        this.load.image('player1Option', './assets/tronPlayerSelect1.png');
        this.load.image('player2Option', './assets/tronPlayerSelect2.png');

        // load audio
        this.load.audio('sfx_select', './assets/TronSelectSound.wav');
        this.load.audio('sfx_select_high', './assets/TronSelectHigh.wav');
        this.load.audio('sfx_explosion', './assets/TronExplode.wav');
        this.load.audio('sfx_explosion_2', './assets/TronCrash.wav');
        this.load.audio('sfx_rocket', './assets/TronCycleGo.wav');

        // load main music
        this.load.audio("mainMusic",'./assets/TronTheme.wav');
    }

    create() {
    
        //Background
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0,0);
        this.optionImage = this.add.image(70, 385, 'player1Option').setOrigin(0,0);

        // Multiplayer
        this.players = 1;

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                players: this.players,
                spaceshipSpeed: 1,
                gameTimer: 60000
            }
            this.sound.play('sfx_select_high');
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                players: this.players,
                spaceshipSpeed: 1.5,
                gameTimer: 45000
            }
            this.sound.play('sfx_select_high');
            this.scene.start('playScene');
        }

        if (Phaser.Input.Keyboard.JustDown(key1)) {
            this.players = 1;
            this.optionImage.setTexture('player1Option');
            this.sound.play('sfx_select');
        }

        if (Phaser.Input.Keyboard.JustDown(key2)) {
            this.players = 2;
            this.optionImage.setTexture('player2Option');
            this.sound.play('sfx_select');
        }
      }

        
}