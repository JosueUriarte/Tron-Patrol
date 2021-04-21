// TRON PATROL
// CREATED BY JOSUE URIARTE REYES more info in main.js file

class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
        var rt;
        var trail;
        var player;
        var tween;
    }

    

    preload(){
        // load the images/tile sprites
        this.load.image('rocket', './assets/playercycle.png');
        this.load.image('rocket2', './assets/playerCycle2.png');
        this.load.image('spaceship', './assets/enemyCycle.png');
        this.load.image('starfield', './assets/tronBackground.png');
        this.load.image('tronUI', './assets/tronUI.png');
        this.load.image('trail', 'assets/p1CycleTrail.png');
        this.load.image('trail2', 'assets/p2CycleTrail.png');

        // load a spritesheet
        this.load.spritesheet('explosion', './assets/tronExplosion.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 5
        })
    }

    create() {

        // define keys for rocket p1
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        if(game.settings.players == 2){
            keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        }

        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height,
             'starfield').setOrigin(0,0);

        // Blue UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
            borderUISize * 2, 0x34ADEB).setOrigin(0,0);
        this.add.rectangle(0, borderUISize + borderPadding + 8, game.config.width,
            borderUISize*1.5, 0xbbfbfb).setOrigin(0,0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize -
            borderPadding - 38, 'rocket', 0, keyLEFT, keyRIGHT, keyM).setOrigin(0, 0);
        
        // add player 2 if possible
        if(game.settings.players == 2){
            this.p2Rocket = new Rocket(this, game.config.width/2 - 25, game.config.height - borderUISize -
                borderPadding - 38, 'rocket2', 0, keyA, keyD, keyB).setOrigin(0, 0);
            //this.p2Rocket.z = 1;
        }

        

        //add rocket (player 2)
        //this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize -
            //borderPadding, 'rocket').setOrigin(0.0, 0);

        //adding line
        // creating my line
        //this.path = new Phaser.Curves.Path(0, 0);

        
        // this.graphics = new TronPath(this);
        // this.graphics.lineStyle(5, 0xFF00FF, 1.0);
        // this.graphics.beginPath();
        // this.graphics.moveTo(this.p1Rocket.x + 10, this.p1Rocket.y + 50);
        // this.graphics.lineTo(400, 400);
        // this.graphics.closePath();
        // this.graphics.strokePath();

        //this.path.cubicBezierTo(this.p1Rocket.x, this.p1Rocket.y, 10, 10, 10);
        this.enemyGroup = this.physics.add.group();
        this.physics.world.enable(this.enemyGroup);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4,
            'spaceship', 0, 50, 3).setOrigin(0, 0);
        this.physics.add.existing(this.ship01);
        this.enemyGroup.add(this.ship01);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 +
            borderPadding+2,'spaceship', 0, 30, 2.5).setOrigin(0, 0);
        this.enemyGroup.add(this.ship02);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4,
            'spaceship', 0, 10, 2).setOrigin(0, 0);
        this.physics.add.existing(this.ship03);
        this.enemyGroup.add(this.ship03);
        // Making Trail??
        // this.rt = this.add.renderTexture(15, 65, 800, 800);

        // this.trail = this.add.image(this.p1Rocket.x + 10, this.p1Rocket.y + 10, 'trail').setVisible(false);

        // this.tween = this.tweens.add({
        //     targets: this.trail,
        //     x: this.p1Rocket.x,
        //     y: this.p1Rocket.y,
        //     ease: 'Sine.easeInOut',
        //     duration: 500,
        //     repeat: -1
        // });

        this.trailGroup = this.physics.add.group ({
            classType: TronPath,
            setDepth: 0,
            maxSize: 100,
            runChildUpdate: true
        });

        if(game.settings.players == 2){
            this.trailGroup2 = this.physics.add.group ({
                classType: TronPath,
                setDepth: 0,
                maxSize: 100,
                runChildUpdate: true
            });
        }


        //this.trailGroup.enableBody = true;
        //this.trailGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // Borders
        let border1 = 0x34ADEB;
        let border2 = 0x000000;

        this.layer = this.add.layer();
        this.layer.depth = 1;

        //-------TOP
        this.add.rectangle(0, 0, game.config.width, borderUISize, border1).setOrigin(0,0);
        this.add.rectangle(0, 8, game.config.width, borderUISize/2, border2).setOrigin(0,0);
        
        //-------BOTTOM
        this.layer.add(this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
            borderUISize, border1).setOrigin(0,0));

        //-------LEFT
        this.add.rectangle(0, 0, borderUISize, game.config.height, border1).setOrigin(0,0);
        this.layer.add(this.add.rectangle(8, 16, borderUISize/2, game.config.height - 22, border2).setOrigin(0,0));

        //-------RIGHT
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            border1).setOrigin(0,0);
        this.layer.add(this.add.rectangle(game.config.width - borderUISize + 8, 16, borderUISize/2, game.config.height - 22,
        border2).setOrigin(0,0));
        
        //-------BOTTOM BLACK
        this.layer.add(this.add.rectangle(10, game.config.height - borderUISize + 10, game.config.width - 20,
            borderUISize/2, border2).setOrigin(0,0));

                    
        // TRON UI
        this.add.image(0, 0, 'tronUI').setOrigin(0,0);



        

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 20
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
        this.timeLeft = this.add.text(borderUISize + borderPadding + 455, borderUISize + 10 + borderPadding*2, game.settings.gameTimer, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // Timer ?????
        //this.timedEvent = this.time.delayedCall(game.settings.gameTimer, onEvent, [], this);

        //let numx = game.config.width/2;
        //let numy = game.config.height - borderUISize - borderPadding - 25;
        // add line to rocket
        //this.p1RocketLine = new TronPath(this, 0, 0, numx, numy, 0, 0, 0xff0000);

        // In game Time Clock

        // display score
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //this.circleMf = this.add.ellipse(this);
        this.physics.add.overlap(this.trailGroup, this.enemyGroup, this.collisionHandler, null, this);
        if(game.settings.players == 2){
            this.physics.add.overlap(this.trailGroup2, this.enemyGroup, this.collisionHandler, null, this);
        }
    }


    update() {

        // var dist = Phaser.Math.Distance.Between(this.trail.x, this.trail.y, this.p1Rocket.x, this.p1Rocket.y);
        // this.tween.timeScale = dist / 100;

        // this.tween.updateTo('x', this.p1Rocket.x, true);
        // this.tween.updateTo('y', this.p1Rocket.y, true);

        // this.trail.setAlpha(800 / (dist + 0.001));
        // this.trail.setTint(dist | 0xff0000);

        // this.rt.draw(this.trail);
        //this.circleMf.x = this.trail.x;
        //this.circleMf.y = this.trail.y;
        //var trail = this.trailGroup.get();
        //console.log(trail);
        

        if(!this.gameOver) {
            var trail = this.trailGroup.get();
            trail.setTexture('trail');

            if(trail){
                
                trail.attach(this.p1Rocket.x + 14, this.p1Rocket.y + 70);
            }
        }

        if(!this.gameOver && game.settings.players == 2) {
            var trail2 = this.trailGroup2.get();
            trail2.setTexture('trail2');

            if(trail2){
                
                trail2.attach(this.p2Rocket.x + 14, this.p2Rocket.y + 70);
            }
        }

        //console.log(this.rt.displayList());
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

            if(game.settings.players == 2){
                this.p2Rocket.update();
            }
            // update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //this.physics.add.collider(player, group, myHandler);

        //console.log(this.trailGroup.getChildren());
        //if(this.checkGroupCollision(this.trailGroup, this.ship03)){
        //    this.shipExplode(this.ship03);
        //}

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, false);
            //this.rt.clear();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){   
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, false);
            //this.rt.clear();
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, false);
            //this.rt.clear();
        }

        if(game.settings.players == 2){
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship03, false);
                //this.rt.clear();
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){   
                this.p2Rocket.reset();
                this.shipExplode(this.ship02, false);
                //this.rt.clear();
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(this.ship01, false);
                //this.rt.clear();
            }
        }

        // if(this.p1Rocket.y <= borderUISize * 2 + borderPadding + 5){
        //     this.rt.clear();
        // }

        // if(this.p1Rocket.y == game.config.height - borderUISize - borderPadding - 38){
        //     this.rt.clear();
        // }

        this.timeLeft.text = (1 - this.clock.getProgress()).toString().substr(2, 2)

    }

    collisionHandler(trail, enemyCycle){
        //console.log("hi");
        enemyCycle.disableBody(true,true);
        this.shipExplode(enemyCycle, true);
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

    shipExplode(ship, hitTrail) {
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
        if(hitTrail){
            this.p1Score += ship.points;
            this.sound.play('sfx_explosion'); 
        }
        else{
            this.sound.play('sfx_explosion_2');
            this.p1Score -= 30;
        }
        
        if(this.p1Score < 0){
            this.p1Score = 0;
        }
        this.scoreLeft.text = this.p1Score;
        
    }
}