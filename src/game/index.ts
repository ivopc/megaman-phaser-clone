import Phaser from "phaser";
import Level from "./scenes/Level";

export let game: Phaser.Game;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scene: [ Level ],
    physics: {
        default: "matter"
    },
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
};

document.addEventListener("DOMContentLoaded", () => {
    game = new Phaser.Game(config);
});
