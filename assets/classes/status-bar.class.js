class StatusBar extends DrawableObject {

    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;
                                // beim Laden der Klasse wird zunächst immer der constructor aufgerufen - dieser Stellt die Hauptfunktion dar.
    constructor(){
        super();                //super() muss stets aufgerufen werden, damit wir die Methoden der übergeordneten Klasse aufrufen können
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);    // hier rufen wir die setPercentage() auf und geben den Anfangswert von 100 mit
    }

    //setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage;   // aus der Prozentzahl müssen wir nun eine Zahl zwischen 0 und 5 ermitteln
        let path = this.IMAGES[this.resolveImageIndex()];   // eines der ArrayBilder wird herausgesucht und in den 'path' hinein geladen
        this.img = this.imageCache[path];   // das aktuelle Bild soll dem Bild vom imageCache entsprechen
    }

    resolveImageIndex(){
        if(this.percentage == 100) {
            return 5;

        }   else if (this.percentage > 80) {
            return 4;

        }else if (this.percentage > 60) {
            return 3;

        }else if (this.percentage > 40) {
            return 2;

        }else if (this.percentage > 20) {
            return 1;
        
        } else {
            return 0;
        }
    }

}