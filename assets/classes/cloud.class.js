class Cloud extends MovableObject {
    y = 10;
    height = 350;
    width = 750;


    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500 ; //mit der Methode math.random() können wir eine zufällige Zahl generieren lassen zwischen 0 und 1, z.B. 0.2 oder 0.7. Deshalb multiplizieren wir das Ergebnis der Math.random() methode nochmal * 500.
        this.animate();

    }
    
    animate(){
        this.moveLeft();
    }


}
