class Chicken extends MovableObject{
    height = 100;
    y = 320;

    IMAGES_WALKING = [            
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ];
    
    IMAGES_DEAD = [            
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
        ];

        chicken_sound = new Audio('assets/audio/3_chicken (mp3cut.net).wav');

    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);       // hierdurch wird ein Array befüllt mit den aufgelisteten Bildern/ Bildverzeichnispfaden, innerhalb von []
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1500 + Math.random() * 500 ; //mit der Methode math.random() können wir eine zufällige Zahl generieren lassen zwischen 0 und 1, z.B. 0.2 oder 0.7. Deshalb multiplizieren wir das Ergebnis der Math.random() methode nochmal * 500.
        this.speed = 0.15 + Math.random() * 0.5;
        
        this.animate();
    }

    animate(){
        setInterval(() => {        //alles zwischen den gescheiften Klammern wird ausgeführt: X-Koordinate verringert sich alle 1000 Milllisekunden um 5 bzw. um 0.15;
            this.moveLeft();
        }, 1000/ 60);                   // 1000/60 bedeutet 1000Millisekunden geteilt durch 60 = 60 fps (frames per Second)


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        // setInterval(() => {
        //     this.chicken_sound.play();   //Chicken sounds
        // }, 10000);

       
    }

    deadChicken() {
            setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200)
    }

}