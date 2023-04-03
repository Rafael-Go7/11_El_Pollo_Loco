class Level {

    enemies;
    endboss;
    clouds;
    // coins;
    // ThrowableObject;
    backgroundObjects;
    level_end_x = 2350;


    constructor (enemies, endboss, clouds, backgroundObjects){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        // this.coins = coins;
        // this.ThrowableObject = ThrowableObject;
        this.backgroundObjects = backgroundObjects;
    }

}