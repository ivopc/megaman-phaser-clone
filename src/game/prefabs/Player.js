import Character from "./Character";
import Projectile from "./Projectile";

import { CATEGORY_WORLD_BOUNDS, CATEGORY_PLAYER } from "../consts/Collision";

export default class Player extends Character {
    constructor (scene) {
        super(scene, "player");
        this.setCollisionGroup(CATEGORY_PLAYER);
        this.setCollisionCategory(CATEGORY_PLAYER);
        this.setCollidesWith(CATEGORY_WORLD_BOUNDS);
    }
};