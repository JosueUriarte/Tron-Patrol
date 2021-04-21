// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, LEFT, RIGHT, SHOOT){
        super(scene, x, y, texture, frame, LEFT, RIGHT, SHOOT);

        // add object to the exsisting scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 1.5;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

        // movement keys passed over
        this.LEFT = LEFT;
        this.RIGHT = RIGHT;
        this.SHOOT = SHOOT;
    }

    update(){
        // left/right movement
        //if(!this.isFiring){
            if(this.LEFT.isDown && this.x >= borderUISize + this.width - 25){
                this.x -= this.moveSpeed;
                //this.setAngle(90);
            }
            else if(this.RIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        //}

        // fire button
        if(Phaser.Input.Keyboard.JustDown(this.SHOOT) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        // move the rocket up if fired
        if(this.isFiring && this.y >= borderUISize * 2 + borderPadding){
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 2 + borderPadding){
            this.reset();
        }

    }

    reset(renderTexture){
        //graphics.active();
        //renderTexture.clear();
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 38;
        //randomize the x position after missing
        this.x = Math.random() * 
        ((game.config.width - borderUISize - borderPadding) - (borderUISize + borderPadding)) + borderUISize + borderPadding;
        //this.x = borderUISize + borderPadding;
    }
}