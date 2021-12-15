import Phaser from "phaser";
import Player from "../prefabs/Player";


export default class Level extends Phaser.Scene {

    public player: Player;
    public cursos: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor () {
        super({ key: "Level" });
    }

    preload () {
        this.load.atlas("px-player", "assets/img/characters/px.png", "assets/animsheet/px.json");
        this.load.atlas("misc", "assets/img/misc/misc.png", "assets/animsheet/misc.json")
        //this.load.image("hx-player", "assets/img/characters/hx.png");
    }

    create () {
        this.matter.world.setBounds(0, 0, 1920, 1080);
        this.cursos = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on("keydown-Z", () => this.player.fire());
        this.player = new Player(this);
        this.matter.world.on("collisionstart", (event, collA, collB) => {
            console.log({ label: collB.label });
            if (collB.label === "projectile") {
                console.log("lol");
            };
            if (collA.label === WORLD_LABEL && collB.label === "player") {
                this.player.resetJump();
            };
        });
    }

    update () {
        if (this.cursos.left.isDown) {
            this.player.move("left");
        } else if (this.cursos.right.isDown) {
            this.player.move("right");
        } else {
            this.player.playAnim("idle");
        };
        if (this.cursos.up.isDown) {
            this.player.jump();
        };
    }
};



const WORLD_LABEL = "Rectangle Body";