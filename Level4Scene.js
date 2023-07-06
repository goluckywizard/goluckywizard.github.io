import Phaser from 'phaser'
import PreloadHelper from "./preload-helper";
import Player from "./player";
import Enemy from "./enemy";
import UiScene from "./ui-scene";

export default class Level4Scene extends Phaser.Scene {
    constructor() {
        super('level4-scene');
        this.viewportWidth = 2560;
        this.viewportHeight = 600;
    }
    enemies = []
    hearts = []
    maxHearts = 3
    preload() {
        PreloadHelper.preloadLevel4(this)
    }

    create() {
        this.sound.unlock();
        this.sound.play('lofi4');

        this.enemies = []
        this.hearts = []
        this.maxHearts = 3
        let bg;
        for (let n = 0; n < 5; n += 1) {
            bg = this.add.image(533 * n, 0,'background_l4').setOrigin(0, 0);
        }
        const map = this.make.tilemap({ key: "level4_1", tileWidth: 16, tileHeight: 16 });
        const map2 = this.make.tilemap({ key: "level4_2", tileWidth: 16, tileHeight: 16 });
        const map3 = this.make.tilemap({ key: "level4_3", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("level4");
        const tileset2 = map2.addTilesetImage("level4");
        const tileset3 = map3.addTilesetImage("level4");
        this.platforms = map.createLayer(0, tileset, 0, 0);
        this.bg = map2.createLayer(0, tileset2, 0, 0);
        map3.createLayer(0, tileset3, 0, 0);
        this.platforms.setCollisionByExclusion(-1, true);
        this.physics.world.setBounds(0, 0, this.viewportWidth, this.viewportHeight)
        this.player = new Player(this, 10, 10);
        this.createEnemies()
        this.physics.add.collider(this.player.sprite, this.platforms);

        let camera = this.cameras.main;
        camera.setBounds(0, 0, this.viewportWidth, this.viewportHeight)
        camera.startFollow(this.player.sprite)
        camera.setZoom(3.5)
        // this.physics.add.overlap(this.player.sprite, this.e1.sprite, this.hitBaddie, null, this);
        for (const enemy of this.enemies) {
            this.physics.add.overlap(this.player.sprite, enemy.sprite, this.hitBaddie, null, this);
        }
        this.createPortal()
        this.createSocks()
        this.scene.launch('ui-scene')
    }
    createSocks() {
        let socks = []
        socks.push(this.physics.add.sprite(320, 96, "sock23").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(560, 64, "sock24").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1008, 96, "sock25").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1152, 64, "sock26").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1552, 64, "sock27").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1952, 64, "sock28").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(2256, 48, "sock29").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))

        for (const sock of socks) {
            this.physics.add.overlap(this.player.sprite, sock, this.getSock, null, this);
        }
    }
    getSock(player, sock) {
        console.log("qwery")
        sock.disableBody(false, false);
        sock.setVisible(false)
        this.scene.get('ui-scene').increaseSocks()
    }
    createPortal() {
        this.anims.create({
            key: 'g_left',
            frames: this.anims.generateFrameNumbers("gryoma", {
                frames: [0, 1]
            }),
            frameRate: 20,
            repeat: -1
        });
        let h = this.physics.add.sprite(2500, 57,'house').setScale(0.4).setGravity(0, -800);
        this.add.image(2470, 100, 'kirill').setScale(0.4)
        let gryoma = this.physics.add.sprite(2530, 115, "gryoma", 0)
            .setCollideWorldBounds(false)
            // .setBounce(0.1)
            .setScale(0.3)
            .setGravity(0, -800);
        gryoma.play('g_left')
        this.physics.add.overlap(this.player.sprite, h, (scene) => {this.scene.start("end-screen")}, null, this)
        this.physics.add.overlap(this.player.sprite, gryoma, (scene) => {this.scene.start("end-screen")}, null, this)
    }
    createEnemies() {
        //let enemies = this.physics.add.group();
        //this.e1 = new Enemy(this, 660, 100, 640, 690)
        this.enemies.push(new Enemy(this, 848, 80, 816, 880))
        this.enemies.push(new Enemy(this, 1562, 78, 1534, 1590))
        this.enemies.push(new Enemy(this, 2256, 64, 2224, 2288))

        for (const enemiesKey of this.enemies) {
            this.physics.add.collider(enemiesKey.sprite, this.platforms)
        }
        // this.physics.add.group(enemies)
    }
    update(time, delta) {
        try {
            this.player.update();
            for (const enemiesKey of this.enemies) {
                enemiesKey.update(time, delta)
            }
        }
        catch (e) {
        }
        // console.log(this.player.sprite.x)
        // this.cameras.main.scrollX = this.player.position.x
    }


    hitBaddie(player, baddie) {
        if (this.player.invincible) {
            // baddie.setActive(false).setVisible(false);
            //play baddies super death animation
            /*var tween = this.tweens.add({
                targets: baddie,
                alpha: 0.3,
                y: "-=150",
                scaleX: 2.5,
                scaleY: 2.5,
                angle: 180,
                ease: 'Linear',
                duration: 200,
                onComplete: function() {
                    destroyGameObject(baddie);
                },
            });*/
        } else {
            //baddie was hit on the head and hasn't already been hit
            if (baddie.body.touching.up) {
                // set baddie as being hit and remove physics
                baddie.disableBody(false, false);
                // player.setVelocityY(jumpVelocity);

                //play baddies death animation
                var tween = this.tweens.add({
                    targets: baddie,
                    alpha: 0.3,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    ease: 'Linear',
                    duration: 200,
                    onComplete: function() {
                        //.destroyGameObject(baddie);
                        baddie.setActive(false).setVisible(false);
                    },
                });
            }
            //otherwise you've hit baddie, BUT not on the head. This makes you die
            else {
                this.playerHit(this.player);
            }
        }
    }

    playerHit(player) {
        //if you are not already invulnerable OR invincible
        if (!this.player.invincible) {
            // if (true) {
            //set player as invulnerable
            this.player.invincible = true;
            //get the heart sprites from our arrays we set up earlier
            /*var currentHeartCount = player.hearts,
                currentHeart = hearts[currentHeartCount - 1],
                currentHeartOutline = heartOutlines[currentHeartCount - 1];*/

            //fade out the heart fill
            /*var heartFade = this.tweens.add({
                targets: this.player.currentheart,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                ease: 'Linear',
                duration: 200
            });*/
            this.scene.get('ui-scene').decreaseHearts()

            //create a timeline of tweens for the heart outline so it shrinks then grows back
            /*var heartsTimeline = this.tweens.createTimeline();

            //this is the heart outline scaling down
            heartsTimeline.add({
                targets: currentHeartOutline,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'Power1',
                duration: 200
            });*/

            //and then back
            /*heartsTimeline.add({
                targets: currentHeartOutline,
                scaleX: 1,
                scaleY: 1,
                ease: 'Power1',
                duration: 200
            });*/
            //play the timeline straight away
            // heartsTimeline.play();

            //remove a heart from out count stored on the player object
            this.player.hearts -= 1;
            console.log("player hearts: "+ this.player.hearts)

            //if hearts is 0 or less you're dead as you are out of lives
            if (this.player.hearts <= 0) {
                //remove physics from player
                this.player.sprite.setActive(false).setVisible(false);
                this.scene.start("death-screen")
                //and play death animation
                /*var tween = this.tweens.add({
                    targets: player,
                    alpha: 0.3,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    angle: 90,
                    x: player.x - 20,
                    y: player.y - 20,
                    ease: 'Linear',
                    duration: 200,
                    onComplete: function() {
                        restartGame(this);
                    },
                    onCompleteScope: this
                });*/
            }
            //otherwise you're not dead you've just lost a life so...
            else {
                //make the player stop in their tracks and jump up
                player.sprite.body.velocity.x = 0;
                player.sprite.body.velocity.y = -220;
                //tween the players alpha to 30%
                var tween = this.tweens.add({
                    targets: player,
                    alpha: 0.3,
                    ease: 'Linear',
                    duration: 200,
                    onCompleteScope: this
                });
                //set a timer for 1 second. When this is up we tween player back to normal and make then vulnerable again
                let vulnerableTime = 1
                var timer = this.time.delayedCall(vulnerableTime, playerVulnerable, [this]);

                function playerVulnerable(game) {
                    var death = game.tweens.add({
                        targets: player,
                        alpha: 1,
                        ease: 'Linear',
                        duration: 200,
                        onComplete: function() {
                            game.player.invincible = false;
                        },
                        onCompleteScope: this
                    });
                }

            }
        }
    }
}