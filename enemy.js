export default class Enemy {
    right;
    left;
    direction = 1
    speed = 100
    constructor(scene, x, y, left, right) {
        this.scene = scene;
        this.left = left
        this.right = right
        // Create the animations we need from the player spritesheet
        const anims = scene.anims;

        anims.create({
            key: 'e_left',
            frames: anims.generateFrameNumbers("enemy", {
                frames: [0]
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'e_right',
            frames: anims.generateFrameNumbers("enemy", {
                frames: [1]
            }),
            frameRate: 10,
            repeat: -1
        });
        // anims.create({
        //     key: 'idle',
        //     frames: [{ key: 'player', frame: 0 }],
        //     frameRate: 10,
        // });

        // anims.create({
        //     key: 'jump',
        //     frames: [{ key: 'player', frame: 'robo_player_1' }],
        //     frameRate: 10,
        // });

        this.sprite = scene.physics.add
            .sprite(x, y, "enemy", 0)
            .setBounce(0.1)
            .setCollideWorldBounds(true)
            .setScale(0.35);

        // Track the arrow keys & WASD
        // const { LEFT, RIGHT, UP, W, A, D, SPACE, ENTER } = Phaser.Input.Keyboard.KeyCodes;
        // this.keys = scene.input.keyboard.addKeys({
        //     left: LEFT,
        //     right: RIGHT,
        //     up: UP,
        //     space: SPACE,
        //     enter: ENTER,
        //     w: W,
        //     a: A,
        //     d: D
        // });
        // scene.game.camera.follow(this);
    }

    update(time, delta) {
        const { keys, sprite } = this;
        if (this.sprite.x > this.left && this.direction > 0) {
            sprite.setVelocityX(-this.speed);
            if (sprite.body.onFloor()) {
                sprite.play('e_left', true);
            }
        } else if (this.direction > 0) {
            this.direction = -this.direction
        } else if (this.sprite.x < this.right && this.direction < 0) {
            sprite.setVelocityX(this.speed);
            if (sprite.body.onFloor()) {
                sprite.play('e_right', true);
            }
        } else if (this.direction < 0) {
            this.direction = -this.direction
        } else {
            sprite.setVelocityX(0);
            if (sprite.body.onFloor()) {
                sprite.play('idle', true);
            }
        }

        // // Player can jump while walking any direction by pressing the space bar
        // // or the 'UP' arrow
        // if ((keys.space.isDown || keys.up.isDown) && sprite.body.onFloor()) {
        //     // this.scene.jumpSound.play();
        //     sprite.setVelocityY(-350);
        //     sprite.play('idle', true);
        // }
    }

    destroy() {
        this.sprite.destroy();
    }
}