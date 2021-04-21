class Spaceship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, shipSpeed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed * shipSpeed;
        this.yPos = y;
    }

    update(){
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around LEFT to RIGHT
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.enableBody(true, game.config.width, this.yPos, true, true);
        this.x = game.config.width;
    }
}

