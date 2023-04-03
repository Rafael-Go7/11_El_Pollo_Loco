class Bottle extends MovableObject{
    // x;
    // y;// y = 360;
    height = 60;   //Höhe des Imgs
    width = 50;

    IMAGES_BOTTLE_ON_GROUND = [
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(){          
        super().loadImage('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        // this.x = 500 + Math.random() * 500 ; //mit der Methode math.random() können wir eine zufällige Zahl generieren lassen zwischen 0 und 1, z.B. 0.2 oder 0.7. Deshalb multiplizieren wir das Ergebnis der Math.random() methode nochmal * 500.
        // this.AnimateBottles();      
    }

//     AnimateBottles() {

//     }
}