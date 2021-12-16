import Phaser from "phaser";
import Player from "../prefabs/Player";

import { Facing } from "../consts/Character";

export default class Level extends Phaser.Scene {

    public player: Player;
    public cursos: Phaser.Types.Input.Keyboard.CursorKeys;
    public destroyList: Array<any>;

    constructor () {
        super({ key: "Level" });
        this.destroyList = [];
    }

    preload () {
        this.load.atlas("px-player", "assets/img/characters/px.png", "assets/animsheet/px.json");
        this.load.atlas("misc", "assets/img/misc/misc.png", "assets/animsheet/misc.json")
        //this.load.image("hx-player", "assets/img/characters/hx.png");
    }

    create () {
        globalThis.debug = this;
        this.events.on("register-to-destroy", this.registerDestroy, this);
        this.matter.world.setBounds(0, 0, 1920, 1080);
        this.player = new Player(this);
        this.cursos = this.input.keyboard.createCursorKeys();
        this.matter.world.on("collisionstart", this.onCollisionStart, this);
        //console.log(this.matter.world.getAllBodies().map(({ collisionFilter: { mask } }) => mask ));
        
    }
    
    registerDestroy (label) {
        this.destroyList.push(label);
    }

    update () {
        this.destroyList.forEach(destroyBody, this);
        this.destroyList.length = 0;
        if (this.cursos.left.isDown) {
            this.player.move(Facing.Left);
        } else if (this.cursos.right.isDown) {
            this.player.move(Facing.Right);
        } else if (!this.player.isPlayingPowerfulFire) {
            this.player.playAnim("idle");
        };
        if (this.cursos.up.isDown) {
            this.player.jump();
        };
    }

    onCollisionStart (event, collA, collB) {
        if (collB.label.startsWith("projectile-") && collA.label !== "player") {
            this.events.emit("register-to-destroy", collB.label);
        };
        if (collA.label === WORLD_LABEL && collB.label === "player") {
            this.player.resetJump();
        };
    }
};

function destroyBody (this: Level, label: string) {
    const body = this.matter.world.getAllBodies().find(projectile => projectile.label === label);
    //@ts-ignore
    body.gameObject?.destroy();
};

const WORLD_LABEL = "Rectangle Body";