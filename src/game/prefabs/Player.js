import Character from "./Character";
import Projectile from "./Projectile";

export default class Player extends Character {
    constructor (scene) {
        super(scene, "player");
    }
};