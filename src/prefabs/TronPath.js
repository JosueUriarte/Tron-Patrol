class TronPath extends Phaser.GameObjects.Line {
    constructor(scene, x, y, x1, y1, x2, y2, strokeColor, strokeAlpha){
        super(scene, x, y, x1, y1, x2, y2, strokeColor, strokeAlpha);
        scene.add.existing(this);

        //this.points = pointValue;
        //this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update(){
        
        // wrap around LEFT to RIGHT
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
    }
}