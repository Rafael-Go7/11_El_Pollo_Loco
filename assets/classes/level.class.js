class Level {

    enemies;
    clouds;
    // coins;
    // ThrowableObject;
    backgroundObjects;
    level_end_x = 2350;


    constructor (enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        // this.coins = coins;
        // this.ThrowableObject = ThrowableObject;
        this.backgroundObjects = backgroundObjects;
    }

}