const level1 = new Level(
        [                         // Variablen wie character oder enemies werden ohne let definiert
new Chicken(),
new Chicken(),
new Chicken(),
new ChickenSmall(),
new ChickenSmall(),
new ChickenSmall(),
new ChickenSmall(),
new ChickenSmall(),
new Endboss()
],
[
    new Cloud()
],
// [
//     new Coin(300, 100),
//     new Coin(370, 60),
//     new Coin(440, 100),
//     new Coin(650, 10),
//     new Coin(900, 100),
//     new Coin(1200, 50),
//     new Coin(1370, 10),
//     new Coin(1440, 50),
//     new Coin(1600, 100),
//     new Coin(1900, 30),
//   ],
// [
//     new ThrowableObject()
// ],
[
    new BackgroundObject('assets/img/5_background/layers/air.png', -719),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),
    
    new BackgroundObject('assets/img/5_background/layers/air.png', 0),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('assets/img/5_background/layers/air.png', 719),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),

    new BackgroundObject('assets/img/5_background/layers/air.png', 719*2),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*2),

    new BackgroundObject('assets/img/5_background/layers/air.png', 719*3),
    new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3),
   
]

);