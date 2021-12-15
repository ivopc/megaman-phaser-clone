import Phaser from "phaser";

import { createAndLoadAnim } from "../utils/anim";

export default class Projectile extends Phaser.Physics.Matter.Sprite {
    constructor (scene: Phaser.Scene, parent: Phaser.Physics.Matter.Sprite, label: string) {
        super(scene.matter.world, parent.x + 200, parent.y, "misc", "", { label });
        this
            .setFixedRotation()
            .setScale(2)
            .setIgnoreGravity(true);
        this.addAnims();
        scene.add.existing(this);
    }

    addAnims () {
        createAndLoadAnim.bind(this)({ 
            animName: "red_projectile", 
            frames: 4, 
            repeat: -1, 
            frameRate: 16 
        });
        this.anims.play("red_projectile");
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        this.setVelocityX(5);
    }
};