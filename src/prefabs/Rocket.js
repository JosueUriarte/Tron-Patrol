// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to the exsisting scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 1.5;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update(){
        // left/right movement
        //if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
                console.log(this.z);
                //this.setAngle(90);
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        //}

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        // move the rocket up if fired
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }

    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 25;
            
        //randomize the x position after missing
        this.x = Math.random() * 
        ((game.config.width - borderUISize - borderPadding) - (borderUISize + borderPadding)) + borderUISize + borderPadding;
        //this.x = borderUISize + borderPadding;
    }
}