import Phaser from "phaser";

import Projectile from "./Projectile";

import { createAndLoadAnim } from "../utils/anim";

import { Facing } from "../consts/Character";

// import { CATEGORY_WORLD_BOUNDS, CATEGORY_CHARACTERS } from "../consts/Collision";

export default class Character extends Phaser.Physics.Matter.Sprite {

    public isEnableToJump: boolean;
    public projectiles: Array<Projectile>;
    public facing: number;

    constructor (scene: Phaser.Scene, label: string) {
        super(scene.matter.world, 50, 50, "px-player", "", { label });
        this
            .setSize(36, 39)
            .setScale(4)
            .setFixedRotation();
        // this.setCollisionCategory(CATEGORY_CHARACTERS);
        // this.setCollidesWith(CATEGORY_WORLD_BOUNDS);
        this.addAnims();
        this.isEnableToJump = true;
        this.projectiles = [];
        this.facing = Facing.Right;
        scene.add.existing(this);
    }

    move (direction: number) {
        this.facing = direction;
        switch (direction) {
            case Facing.Left: {
                this.flipX = true;
                this.setVelocityX(-10);
                this.playAnim("walk");
                break;
            };
            case Facing.Right: {
                this.flipX = false;
                this.setVelocityX(10);
                this.playAnim("walk");
                break;
            };

        };
    }

    jump () {
        if (!this.isEnableToJump)
            return;
        this.setVelocityY(-15);
        this.isEnableToJump = false;
    }

    resetJump () {
        this.isEnableToJump = true;
    }

    fire () {
        this.projectiles.push(new Projectile(this.scene, this, this.facing));
    }

    addAnims () {
        [
            {
                animName: "idle",
                frames: 8,
                repeat: -1,
                frameRate: 16
            },
            {
                animName: "walk",
                frames: 10,
                repeat: -1,
                frameRate: 16
            }
        ].forEach(createAndLoadAnim, this);
        this.playAnim("idle");
        
    }

    playAnim (anim: string) {
        this.anims.play(this.texture.key + "_" + anim, true);
    }
};