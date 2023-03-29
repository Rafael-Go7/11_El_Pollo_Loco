class ThrowableObject extends MovableObject{

    constructor(x, y){          // (x, y) - Koordinaten werden von wordl.class.js checkThrowObjects() mitgegeben
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;       //Startposition X
        this.y = y;       //Startposition Y
        this.height = 60;   //Höhe des Imgs
        this.width = 50;
        this.throw();               
    }

    throw() {
        this.speedY = 10;       // Geschwindigkeit der Flasche
        this.applyGravity();
        setInterval(() => {
           this.x += 10;  // x-Koordinate soll sich konstant erhöhen
        }, 25);         //milliseconds
    }
}