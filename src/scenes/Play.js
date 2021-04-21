class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        // load the images/tile sprites
        this.load.image('rocket', './assets/playercycle.png');
        this.load.image('spaceship', './assets/enemyCycle.png');
        this.load.image('starfield', './assets/tronBackground.png');
        this.load.image('tronUI', './assets/tronUI.png');

        // load a spritesheet
        this.load.spritesheet('explosion', './assets/tronExplosion.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 5
        })
    }

    create() {
        //this.add.text(20,20, "Rocket Patrol Menu Play");

        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height,
             'starfield').setOrigin(0,0);

        // Blue UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
            borderUISize * 2, 0x34ADEB).setOrigin(0,0);
        this.add.rectangle(0, borderUISize + borderPadding + 8, game.config.width,
            borderUISize*1.5, 0xbbfbfb).setOrigin(0,0);

        //add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize -
            borderPadding - 25, 'rocket').setOrigin(0, 0);

        //add rocket (player 2)
        //this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize -
            //borderPadding, 'rocket').setOrigin(0.0, 0);

        

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
            'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 +
            borderPadding+2,'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4,
            'spaceship', 0, 10).setOrigin(0, 0);
        
        // Borders
        let border1 = 0x34ADEB;
        let border2 = 0x000000;
        //-------TOP
        this.add.rectangle(0, 0, game.config.width, borderUISize, border1).setOrigin(0,0);
        this.add.rectangle(0, 8, game.config.width, borderUISize/2, border2).setOrigin(0,0);
        
        //-------BOTTOM
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
            borderUISize, border1).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize + 10, game.config.width,
            borderUISize/2, border2).setOrigin(0,0);

        //-------LEFT
        this.add.rectangle(0, 0, borderUISize, game.config.height, border1).setOrigin(0,0);
        this.add.rectangle(8, 0, borderUISize/2, game.config.height, border2).setOrigin(0,0);

        //-------RIGHT
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            border1).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize + 8, 0, borderUISize/2, game.config.height,
            border2).setOrigin(0,0);
            
        // TRON UI
        this.add.image(0, 0, 'tronUI').setOrigin(0,0);

        // define keys for rocket p1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 30
        });

        // Main Music config
        this.mainTheme = this.sound.add("mainMusic");
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.mainTheme.play(musicConfig);


        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Roboto',
            fontSize: '20px',
            //backgroundColor: '#00FFE0',
            color: '#FFFFFF',
            align: 'center',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + 10 + borderPadding*2, this.p1Score, scoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        //let numx = game.config.width/2;
        //let numy = game.config.height - borderUISize - borderPadding - 25;
        // add line to rocket
        //this.p1RocketLine = new TronPath(this, 0, 0, numx, numy, 0, 0, 0xff0000);

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.mainTheme.stop();
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.mainTheme.stop();
        }

        // background movement
        this.starfield.tilePositionY -= starSpeed;

        if(!this.gameOver){
            // update rocket
            this.p1Rocket.update();
            
            // update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions 
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.y + rocket.height > ship.y){
                return true;
        } else{ return false;} 
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // play explode animation
        boom.anims.play('explode');
        // callback after anim completes
        boom.on('animationcomplete', () => {    
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); 
    }
}