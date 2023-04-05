class StatusBarEndboss extends DrawableObject {

    IMAGES_StatusBarEndboss = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'

    ];

   energy = 200;
                                // beim Laden der Klasse wird zunächst immer der constructor aufgerufen - dieser Stellt die Hauptfunktion dar.
    constructor(){
        super();                //super() muss stets aufgerufen werden, damit wir die Methoden der übergeordneten Klasse aufrufen können
        this.loadImages(this.IMAGES_StatusBarEndboss);
        this.x = 2270;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(200);    // hier rufen wir die setPercentage() auf und geben den Anfangswert von 100 mit
    }

    //setPercentage(50);
    setPercentage(energy) {
        this.energy = energy;   // aus der Prozentzahl müssen wir nun eine Zahl zwischen 0 und 5 ermitteln
        // this.percentage = Math.max(Math.round(this.energy / 30 * 100), 0);
        let path = this.IMAGES_StatusBarEndboss[this.resolveImageIndex()];   // eines der ArrayBilder wird herausgesucht und in den 'path' hinein geladen
        this.img = this.imageCache[path];   // das aktuelle Bild soll dem Bild vom imageCache entsprechen
    }

    resolveImageIndex(){
        if(this.energy == 200) {
            return 5;

        }   else if (this.energy > 160) {
            return 4;

        }else if (this.energy > 120) {
            return 3;

        }else if (this.energy > 80) {
            return 2;

        }else if (this.energy > 40) {
            return 1;
        
        } else {
            return 0;
        }
    }

}