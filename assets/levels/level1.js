const level1 = new Level(
        [                         // Variablen wie character oder enemies werden ohne let definiert
new Chicken(),
new Chicken(),
new Chicken(),
new ChickenSmall(),
new ChickenSmall(),
new ChickenSmall(),
new ChickenSmall(),
new ChickenSmall()
],
[
    new Endboss()
],
[
    new Cloud()
],
[
    new Bottle(350, 360),
    new Bottle(650, 360),
    new Bottle(850, 360),
    new Bottle(1050, 360),
    new Bottle(1250, 360),
    new Bottle(1450, 360),
    new Bottle(1650, 360)
],
[

    new Coin(370, 160),
    new Coin(440, 140),
    new Coin(510, 130),
    new Coin(580, 140),
    new Coin(650, 160),
    new Coin(1000, 150),
    new Coin(1070, 150),
    new Coin(1130, 150),
    new Coin(1370, 300),
    new Coin(1370, 300),
    new Coin(1440, 300),
    new Coin(1650, 180),
    new Coin(1720, 180)
],
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