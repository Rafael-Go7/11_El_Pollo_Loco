class MovableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;             // Gravity - Geschwindigkeit auf der Y-Achse
    acceleration = 0.5;       // Gravity - wie schnell unsere Objekte beim Fall auf der Y-Achse beschleunigen
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {    // Gemäß isAboveGround() ist der Wert ein negativer, da wir bisher aufgrund der Gravitation nach unten Fallen. || this.speedY > 0 bewirkt nun einen positiven Wert. Energie richtet sich nun nach oben.
                this.y -= this.speedY;          // von der Position auf der y-Koordinate ziehen wir den Wert der Variable speedY ab. Wir haben eine negative Geschiwdigkeit auf der y-Achse, weshalb wir hier Minus rechnen.
                this.speedY -= this.acceleration; // vom Wert der Variablen speedY ziehen wir den Wert der Variablen acceleration ab. Wir haben eine negative Geschiwdigkeit auf der y-Achse, weshalb wir hier ERNEUT Minus rechnen. Spielphysik-Logik.
            }
        }, 1000/ 25); // Funktion soll alle 1000 Millisekunden/ 25 ausgeführt werden
    }


    isAboveGround() {           // ausgelagerter Y- Achsen Wert, welcher returned wird
        if (this instanceof ThrowableObject) { // (instanceof = Wenn es ein throwableObject ist) ThrowableObject should always fall
            return true;
        } else {}
        return this.y < 145;    //das Objekt soll nur so lange nach unten Fallen bis der Wert der Y-Achse 145 erreicht hat
    }


    playAnimation(images){
        let i = this.currentImage % images.length; // Modulo-Methode mit %. %-Zeichen bedeutet an dieser Stelle 'GETEILT!".'Modulo' bedeutet 'mathematischer Rest'.Z.B.: let i= 5 % 6; => 0, Rest 5 -- oder zweites Beispiel -- let i= 6 % 6; => 1, Rest. -- Das dritte Beispiel funktioniert nicht mehr -- let i= 7 % 6; => 1, Rest 1. Deshalb fängt die Modulo-Methode wieder von vorne an zu zählen.
        // 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, ...
        let path = images[i];   // aktueller Pfad wird befüllt mit i, welches in einer Endlos-Schleife läuft
        this.img = this.imageCache[path];   // das aktuelle Bild soll dem Bild vom imageCache entsprechen
        this.currentImage++;    // der Positionswert im Array wid in dieser Schleife jeweils um ++ erhöht. Somit rufen wir die Bilder nacheinadner ab. 
    }


    moveRight(){
        this.x += this.speed;
        console.log('Moving right');
    }


    moveLeft(){
        this.x -= this.speed;
        // console.log('Moving left');
    }


    jump(){
           this.speedY = 15;            // der Speed soll sich erhöhen auf 15
    }

    // Kollisionsformel für MovableObjects
    isColliding(mo) {                           //X und Y Positionskoordinaten der versch. MovableObjects werden miteinander abgeglichen, somit eine Überschneidung bzw. Kollision festgestellt
        return this.x + this.width > mo.x && 
        this.y + this.height > mo.y && 
        this.x < mo.x && 
        this.y < mo.y + mo.height

    }


    hit() {
        this.energy -= 5;       // im Falle einer Kollision mit einem Enemy wird unserem Character 5 Lebensenergie abgezogen
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();    // Zeitpunktabfrage
        }
    }


    isHurt(){
        let timepassed = new Date().getTime() -this.lastHit;    // Difference in milliseconds //Zeitpunkt, an welchem wir das letzte mal getroffen wurden von einem Element
        timepassed = timepassed / 1000; // Difference in seconds
        console.log(timepassed); 
        return timepassed < 1.5;          // 
    }


    isDead() {
        return this.energy == 0;
    }

    // myStopFunction() {
    //     clearInterval(setInterval);
    //   }

}