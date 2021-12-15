export function createAndLoadAnim (this: Phaser.GameObjects.Sprite, { animName, frames, repeat, frameRate }): void {
    this.scene.anims.create({
        key: this.texture.key + "_" + animName,
        frames: [ ... Array(frames)].map((_, index) => ({ key: this.texture.key, frame: `${animName}${index}` })),
        repeat,
        frameRate
    });
    this.anims["load"](this.texture.key + "_" + animName);
};