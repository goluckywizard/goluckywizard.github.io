export default class PreloadHelper {
    static preloadUI(scene) {
        scene.load.image('heart', './assets/kinder-empty.png');
        scene.load.image('heart-filled', './assets/kinder.png')
        scene.load.image('default-sock', './assets/socks/socks1.png')
    }
    static preload(scene) {
        scene.load.image("level1", "./assets/tilemaps/level1_tileset.png");
        scene.load.tilemapCSV("level1_1", "./assets/tilemaps/level1_1.csv");
        scene.load.tilemapCSV("level1_2", "./assets/tilemaps/level1_2.csv");
        scene.load.image("background_sky", "./assets/sky.jpg")
        scene.load.spritesheet('player', "./assets/bridges.png", { frameWidth: 74, frameHeight: 134, spacing: 60 });
        scene.load.spritesheet('enemy', "./assets/enemy.png", { frameWidth: 64, frameHeight: 64 });
        scene.load.spritesheet('portal', "./assets/portal.png", {frameWidth: 310, frameHeight: 590})

        scene.load.spritesheet('sock2', './assets/socks/socks2.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock3', './assets/socks/socks3.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock4', './assets/socks/socks4.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock5', './assets/socks/socks5.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock6', './assets/socks/socks6.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock7', './assets/socks/socks7.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock8', './assets/socks/socks8.png', {frameWidth: 64, frameHeight: 64})

        scene.load.audio('lofi1', './assets/audio/lof1.mp3')
    }
    static preloadLevel2(scene) {
        scene.load.image("level2", "./assets/tilemaps/level2_tileset.png");
        scene.load.tilemapCSV("level2_1", "./assets/tilemaps/level2.csv");
        scene.load.tilemapCSV("level2_2", "./assets/tilemaps/level2_2.csv");
        scene.load.image("background_sky2", "./assets/level3_bg.png")
        scene.load.spritesheet('player', "./assets/bridges.png", { frameWidth: 74, frameHeight: 134, spacing: 60 });
        scene.load.spritesheet('portal', "./assets/portal.png", {frameWidth: 310, frameHeight: 590})
        scene.load.spritesheet('enemy', "./assets/enemy.png", { frameWidth: 64, frameHeight: 64 });

        scene.load.spritesheet('sock9', './assets/socks/socks9.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock10', './assets/socks/socks10.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock11', './assets/socks/socks11.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock12', './assets/socks/socks12.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock13', './assets/socks/socks13.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock14', './assets/socks/socks14.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock15', './assets/socks/socks15.png', {frameWidth: 64, frameHeight: 64})

        scene.load.audio('lofi2', './assets/audio/lofi2.mp3')
    }
    static preloadLevel3(scene) {
        scene.load.image("level3", "./assets/tilemaps/level3_tileset.png");
        scene.load.tilemapCSV("level3_1", "./assets/tilemaps/level3_1.csv");
        scene.load.tilemapCSV("level3_2", "./assets/tilemaps/level3_2.csv");
        scene.load.image("background_sky3", "./assets/level3_bg.png")
        scene.load.spritesheet('portal', "./assets/portal.png", {frameWidth: 310, frameHeight: 590})
        scene.load.spritesheet('enemy', "./assets/enemy.png", { frameWidth: 64, frameHeight: 64 });
        scene.load.spritesheet('player', "./assets/bridges.png", { frameWidth: 74, frameHeight: 134, spacing: 60 });

        scene.load.spritesheet('sock16', './assets/socks/socks16.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock17', './assets/socks/socks17.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock18', './assets/socks/socks18.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock19', './assets/socks/socks19.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock20', './assets/socks/socks20.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock21', './assets/socks/socks21.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock22', './assets/socks/socks22.png', {frameWidth: 64, frameHeight: 64})

        scene.load.audio('lofi3', './assets/audio/lofi3.mp3')
    }
    static preloadLevel4(scene) {
        scene.load.image("level4", "./assets/tilemaps/level4_tileset.png");
        scene.load.tilemapCSV("level4_1", "./assets/tilemaps/level4_1.csv");
        scene.load.tilemapCSV("level4_2", "./assets/tilemaps/level4_2.csv");
        scene.load.tilemapCSV("level4_3", "./assets/tilemaps/level4_3.csv");
        scene.load.image("background_l4", "./assets/level4_bg.png")
        scene.load.spritesheet('portal', "./assets/portal.png", {frameWidth: 310, frameHeight: 590})
        scene.load.spritesheet('enemy', "./assets/enemy.png", { frameWidth: 64, frameHeight: 64 });
        scene.load.spritesheet('player', "./assets/bridges.png", { frameWidth: 74, frameHeight: 134, spacing: 60 });

        scene.load.image("kirill", "./assets/kirill.png")
        scene.load.spritesheet("house", "./assets/house.png", { frameWidth: 340, frameHeight: 360})
        scene.load.spritesheet('gryoma', "./assets/gryoma.png", { frameWidth: 44, frameHeight: 66, spacing: 60 });

        scene.load.spritesheet('sock23', './assets/socks/socks23.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock24', './assets/socks/socks24.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock25', './assets/socks/socks25.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock26', './assets/socks/socks26.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock27', './assets/socks/socks27.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock28', './assets/socks/socks28.png', {frameWidth: 64, frameHeight: 64})
        scene.load.spritesheet('sock29', './assets/socks/socks29.png', {frameWidth: 64, frameHeight: 64})

        scene.load.audio('lofi4', './assets/audio/lofi4.mp3')
    }
    static preloadTitle(scene) {
        scene.load.image("bg_title", "./assets/startscreen.png");
        scene.load.image("playbutton", "./assets/startbutton.png");
        scene.load.spritesheet('title_dog', "./assets/dog.png", { frameWidth: 334, frameHeight: 289 });

        scene.load.audio('lofi_start', './assets/audio/start.mp3')
    }
    static preloadEnd(scene) {
        scene.load.image("end", "./assets/end.png");

        scene.load.audio('lofi_final', './assets/audio/final.mp3')
    }
    static preloadDeath(scene) {
        scene.load.image("bg_death", "./assets/death.png");
        scene.load.image("playbutton", "./assets/startbutton.png");
        scene.load.spritesheet('title_dog', "./assets/dog.png", { frameWidth: 334, frameHeight: 289 });

        scene.load.audio('lofi_death', './assets/audio/death.mp3')
    }
}