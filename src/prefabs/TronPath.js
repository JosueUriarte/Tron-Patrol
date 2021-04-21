class TronPath extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene);
        scene.add.existing(this);
        this.imageSprite = '';
        Phaser.GameObjects.Image.call(this, scene, 0, 0, this.imageSprite);
        this.lifeSpan = 0;
        //this.points = pointValue;
        //this.moveSpeed = game.settings.spaceshipSpeed;
    }

    attach(x, y){
        
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y - 5);
        this.lifespan = 500;
    }

    //set_Texture(image){
    //    this.imageSprite = image;
    //}

    update(time, delta){
        this.lifespan -= delta;

        if (this.lifespan <= 0){
            this.setActive(false);
            this.setVisible(false);
        }
    }

    reset(){
        
    }
}