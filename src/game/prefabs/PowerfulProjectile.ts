import Projectile from "./Projectile";

import { createAndLoadAnim } from "../utils/anim";
import { Facing } from "../consts/Character";

export default class PowerfulProjectile extends Projectile {

    public parent: Phaser.Physics.Matter.Sprite;

    constructor (scene: Phaser.Scene, parent: Phaser.Physics.Matter.Sprite, direction: number) {
        super(scene, parent, direction);
        this.damage = 3;
        this.setScale(2);
        this.direction = direction === Facing.Right ? VELOCITY : -VELOCITY;
    }

    addAnims () {
        createAndLoadAnim.bind(this)({ 
            animName: "powerful_fire", 
            frames: 4, 
            repeat: -1, 
            frameRate: 16 
        }, this.parent.texture.key);
        this.anims.play("powerful_fire");
    }
};

const VELOCITY = 25;