import Phaser from "phaser";

import { Facing } from "../consts/Character";
import { createAndLoadAnim } from "../utils/anim";

import { CATEGORY_WORLD_BOUNDS, CATEGORY_PLAYER_ATTACK } from "../consts/Collision";

export default class Projectile extends Phaser.Physics.Matter.Sprite {
    
    public direction: number;
    
    constructor (scene: Phaser.Scene, parent: Phaser.Physics.Matter.Sprite, direction: number) {
        super(scene.matter.world, parent.x, parent.y, "misc", "", { label: "projectile-" + Phaser.Utils.String.UUID() });
        this
            .setFixedRotation()
            .setScale(2)
            .setIgnoreGravity(true);
        this.setCollisionGroup(CATEGORY_PLAYER_ATTACK);
        this.setCollisionCategory(CATEGORY_PLAYER_ATTACK);
        this.setCollidesWith(CATEGORY_WORLD_BOUNDS);
        this.addAnims();
        this.direction = direction === Facing.Right ? VELOCITY : -VELOCITY;
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
        this.setVelocityX(this.direction);
    }
};

const VELOCITY = 15;