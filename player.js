export default class Player {
    speed = 200
    invincible = false
    hearts = 3
    currentheart = 3
    constructor(scene, x, y) {
        this.scene = scene;

        // Create the animations we need from the player spritesheet
        const anims = scene.anims;

        anims.create({
            key: 'left',
            frames: anims.generateFrameNames('player', {
                start: 1,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'right',
            frames: anims.generateFrameNames('player', {
                start: 4,
                end: 6,
            }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 10,
        });
        anims.create({
            key: 'jump',
            frames: [{ key: 'player', frame: 7 }],
            frameRate: 10,
        });
        // anims.create({
        //     key: 'jump',
        //     frames: [{ key: 'player', frame: 'robo_player_1' }],
        //     frameRate: 10,
        // });

        this.sprite = scene.physics.add
            .sprite(x, y, "player", 0)
            .setBounce(0.1)
            .setCollideWorldBounds(true)
            .setScale(0.25);

        // Track the arrow keys & WASD
        const { LEFT, RIGHT, UP, W, A, D, SPACE, ENTER } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            space: SPACE,
            enter: ENTER,
            w: W,
            a: A,
            d: D
        });
        // scene.game.camera.follow(this);
    }

    update() {
        const { keys, sprite } = this;
        // console.log(this.sprite.x)
        // console.log(this.sprite.y)
        if (keys.left.isDown) {
            // console.log('left')
            sprite.setVelocityX(-this.speed);
            if (sprite.body.onFloor()) {
                sprite.play('left', true);
            }
        } else if (keys.right.isDown) {
            // console.log('right')
            sprite.setVelocityX(this.speed);

            if (sprite.body.onFloor()) {
                sprite.play('right', true);
            }
        } else {
            // If no keys are pressed, the player keeps still
            sprite.setVelocityX(0);
            // Only show the idle animation if the player is footed
            // If this is not included, the player would look idle while jumping
            if (sprite.body.onFloor()) {
                sprite.play('idle', true);
            }
        }

        // Player can jump while walking any direction by pressing the space bar
        // or the 'UP' arrow
        if ((keys.space.isDown || keys.up.isDown) && sprite.body.onFloor()) {
            // this.scene.jumpSound.play();
            sprite.setVelocityY(-350);
            sprite.play('jump', true);
        }
    }

    destroy() {
        this.sprite.destroy();
    }
}