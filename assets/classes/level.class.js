class Level {

    enemies;
    endboss;
    clouds;
    // coins;
    bottles;
    backgroundObjects;
    level_end_x = 2350;


    constructor (enemies, endboss, clouds, bottles, backgroundObjects){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        // this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }

}