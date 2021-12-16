import Character from "./Character";
import PowerfulProjectile from "./PowerfulProjectile";

import { CATEGORY_WORLD_BOUNDS, CATEGORY_PLAYER } from "../consts/Collision";

export default class Player extends Character {

    public fireForceTimer: number;
    public fireKey: Phaser.Input.Keyboard.Key;
    public isPlayingPowerfulFire: boolean;

    constructor (scene) {
        super(scene, "player");
        this.setCollisionGroup(CATEGORY_PLAYER);
        this.setCollisionCategory(CATEGORY_PLAYER);
        this.setCollidesWith(CATEGORY_WORLD_BOUNDS);
        this.createFireKey();
    }

    createFireKey () {
        this.fireKey = this.scene.input.keyboard.addKey('Z')
            .on('down', this.startFireForceCounter, this)
            .on('up', this.preFire, this);
    }

    startFireForceCounter () {
        this.fireForceTimer = this.scene.time.now;
    }

    preFire () {
        if (!this.isPlayingPowerfulFire) {
            this.fire();
        } else {
            this.projectiles.push(new PowerfulProjectile(this.scene, this, this.facing));
        };
        this.fireForceTimer = 0;
        this.playAnim("idle");
        this.isPlayingPowerfulFire = false;
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        if (this.fireKey.isDown) {
            if (time > this.fireForceTimer + POWERFUL_FIRE_BASIC) {
                this.isPlayingPowerfulFire = true;
                this.playAnim("fire_powerful_loading");
            };
        };
    }
};

const POWERFUL_FIRE_BASIC = 300;
const POWERFUL_FIRE_MEDIUM = 800;
const POWERFUL_FIRE_MAXIMUM = 1800;