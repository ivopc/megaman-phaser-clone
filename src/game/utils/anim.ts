export function createAndLoadAnim (
    this: Phaser.GameObjects.Sprite, 
    { animName, frames, repeat, frameRate }, 
    key?: string): void {
    console.log(key);
    key = key || this.texture.key;
    this.scene.anims.create({
        key: key + "_" + animName,
        frames: [ ... Array(frames - 1)].map((_, index) => ({ key, frame: `${animName}${index}` })),
        repeat,
        frameRate
    });
    this.anims["load"](this.texture.key + "_" + animName);
};