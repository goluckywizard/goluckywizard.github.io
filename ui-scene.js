import Phaser from 'phaser'
import PreloadHelper from "./preload-helper";

export default class UiScene extends Phaser.Scene {
    heartOutlines;
    hearts;
    heartscount = 3
    currentHeart
    socks = 0
    maxSocks = 7
    text
    constructor() {
        super('ui-scene');
    }
    preload() {
        PreloadHelper.preloadUI(this)
    }
    create() {
        this.socks = 0
        let heartOutline1 = this.add.sprite(960, 38, 'heart').setScale(0.04, 0.04),
            heartOutline2 = this.add.sprite(920, 38, 'heart').setScale(0.04, 0.04),
            heartOutline3 = this.add.sprite(880, 38, 'heart').setScale(0.04, 0.04);
        this.text = this.add.text(0, 0, "Носки: " + this.socks + " / " + this.maxSocks).setScale(2)

        //and store in an array for easy access later
        this.heartOutlines = [heartOutline1, heartOutline2, heartOutline3];

        //create three heart fills...
        let heart1 = this.add.sprite(960, 38, 'heart-filled').setScale(0.04, 0.04);
        let heart2 = this.add.sprite(920, 38, 'heart-filled').setScale(0.04, 0.04);
        let heart3 = this.add.sprite(880, 38, 'heart-filled').setScale(0.04, 0.04);
        //and store in an array for easy access later
        this.heartscount = 3
        this.hearts = [heart1, heart2, heart3];

        this.currentHeart = this.hearts[this.heartscount - 1]

    }
    increaseSocks() {
        this.socks += 1
        this.text.setVisible(false)
        this.text = this.add.text(0, 0, "Носки: " + this.socks + " / " + this.maxSocks).setScale(2)
    }

    decreaseHearts() {
        var heartFade = this.tweens.add({
            targets: this.currentHeart,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            ease: 'Linear',
            duration: 200
        });
        this.heartscount -= 1
        this.currentHeart = this.hearts[this.heartscount - 1]

    }
}