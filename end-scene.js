import Phaser from 'phaser'
import PreloadHelper from "./preload-helper";
import Level1Scene from "./Level1Scene";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super('end-screen');
    }
    preload() {
        PreloadHelper.preloadEnd(this)
    }
    create() {
        this.sound.unlock();
        this.sound.play('lofi_final');

        this.add.image(0, 0, "end").setOrigin(0).setDepth(0);
    }
}