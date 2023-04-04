class ThrowableObject extends MovableObject{

    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ];
    
    IMAGES_BOTTLE_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ];

    constructor(x, y){          // (x, y) - Koordinaten werden von wordl.class.js checkThrowObjects() mitgegeben
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;       //Startposition X
        this.y = y;       //Startposition Y
        this.height = 60;   //Höhe des Imgs
        this.width = 50;
        this.throw();
        this.animate();               
    }


    throw() {
        this.speedY = 10;       // Geschwindigkeit der Flasche
        this.applyGravity();
        setInterval(() => {
           this.x += 5;  // x-Koordinate soll sich konstant erhöhen
        }, 50);         //milliseconds
    }


    animate(){
        setInterval(() => {
            // console.log('rotation');
            if (this.isAboveGround()) {
                // console.log('bottlehit');
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
                
            } else { if (this.y < 145)
                // console.log('ThrowableObject - hitByBottle', this.bottlehit);
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }
        }, 80);
    }


}