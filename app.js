import Phaser from 'phaser'
import Level1Scene from "./Level1Scene";
import TitleScene from "./title-scene";
import UiScene from "./ui-scene";
import DeathScene from "./death-scene";
import Level2Scene from "./Level2Scene";
import Level3Scene from "./Level3Scene";
import Level4Scene from "./Level4Scene";
import EndScene from "./end-scene";

const config = {
    width: 1000,
    height: 600,
    backgroundColor: 0xffffff,
    // scene: [TitleScene, Level1Scene],
    scene: [TitleScene, Level3Scene, Level1Scene, Level4Scene, Level2Scene, UiScene, DeathScene, EndScene],
    scale: {
        mode: Phaser.Scale.FIT,
        // ...
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    }
}

const game = new Phaser.Game(config)
