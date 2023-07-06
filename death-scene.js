import Phaser from 'phaser'
import PreloadHelper from "./preload-helper";

export default class DeathScene extends Phaser.Scene {
    constructor() {
        super('death-screen');
    }
    preload() {
        PreloadHelper.preloadDeath(this)
    }
    create() {
        this.sound.unlock();
        this.sound.play('lofi_death');

        this.add.image(0, 0, "bg_death").setOrigin(0).setDepth(0);
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 1.2, "playbutton").setDepth(1);

        let hoverSprite = this.add.sprite(334, 289, "title_dog");
        hoverSprite.setScale(0.3);
        hoverSprite.setVisible(false);

        this.anims.create({
            key: "walk",
            frameRate: 8,
            repeat: -1, //repeat forever,
            frames: this.anims.generateFrameNumbers("title_dog", {
                frames: [0, 1]
            })
        });
        /*
           PointerEvents:
               pointerover - hovering
               pointerout - not hovering
               pointerup - click and release
               pointerdown - just click
       */
        playButton.setInteractive();

        playButton.on("pointerover", () => {
            hoverSprite.setVisible(true);
            hoverSprite.play("walk");
            hoverSprite.x = playButton.x - playButton.width;
            hoverSprite.y = playButton.y;

        })

        playButton.on("pointerout", () => {
            hoverSprite.setVisible(false);
        })

        playButton.on("pointerup", () => {
            this.scene.start('platfomer-scene');
        })
    }
}