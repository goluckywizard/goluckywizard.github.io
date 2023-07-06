import Phaser from 'phaser'
import PreloadHelper from "./preload-helper";
import Player from "./player";
import Enemy from "./enemy";
import UiScene from "./ui-scene";

export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super('level2-scene');
        this.viewportWidth = 2560;
        this.viewportHeight = 600;
    }
    enemies = []
    hearts = []
    maxHearts = 3
    preload() {
        // PreloadHelper.preload(this)
        PreloadHelper.preloadLevel2(this)
    }

    create() {
        this.sound.unlock();
        this.sound.play('lofi2');

        this.enemies = []
        this.hearts = []
        this.maxHearts = 3
        let bg;
        for (let n = 0; n < 5; n += 1) {
            bg = this.add.image(640 * n, 0,'background_sky2').setOrigin(0, 0);
        }
        const map = this.make.tilemap({ key: "level2_1", tileWidth: 16, tileHeight: 16 });
        const map2 = this.make.tilemap({ key: "level2_2", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("level2");
        const tileset2 = map2.addTilesetImage("level2");
        this.platforms = map.createLayer(0, tileset, 0, 0);
        this.bg = map2.createLayer('layer', tileset2, 0, 0);
        this.platforms.setCollisionByExclusion(-1, true);
        // this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.viewportHeight)
        this.physics.world.setBounds(0, 0, this.viewportWidth, this.viewportHeight)
        // const spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");
        // this.player = new Player(this, spawnPoint.x, spawnPoint.y);
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
        this.scene.launch('ui-scene')
        this.createSocks()
    }
    createPortal() {
        this.anims.create({
            key: 'p_left',
            frames: this.anims.generateFrameNumbers("portal", {
                frames: [0, 1]
            }),
            frameRate: 10,
            repeat: -1
        });
        let portal = this.physics.add.sprite(2500, 150, "portal")
            .setCollideWorldBounds(true)
            .setScale(0.1)
            .setGravity(0, -800);
        portal.play('p_left')
        this.physics.add.overlap(this.player.sprite, portal, (scene) => {this.scene.start("level3-scene")}, null, this)
    }
    createSocks() {
        let socks = []
        socks.push(this.physics.add.sprite(272, 112, "sock9").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(768, 96, "sock10").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1072, 176, "sock11").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1568, 112, "sock12").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(1744, 64, "sock13").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(2112, 208, "sock14").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))
        socks.push(this.physics.add.sprite(2432, 96, "sock15").setCollideWorldBounds(true).setScale(0.55).setGravity(0, -800))

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
    createEnemies() {
        //let enemies = this.physics.add.group();
        //this.e1 = new Enemy(this, 660, 100, 640, 690)
        this.enemies.push(new Enemy(this, 480, 128, 416, 544))
        this.enemies.push(new Enemy(this, 1216, 128, 1152, 1280))
        this.enemies.push(new Enemy(this, 2240, 144, 2190, 2320))

        for (const enemiesKey of this.enemies) {
            console.log(enemiesKey)
            console.log(enemiesKey.sprite)
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
            console.log("error")
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
                    //tween player back to 100% opacity and reset invulnerability flag
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