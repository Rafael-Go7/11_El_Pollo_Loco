class StatusBarCoins extends DrawableObject {

    IMAGES_StatusBarCoins = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    coins = 0;
                                // beim Laden der Klasse wird zunächst immer der constructor aufgerufen - dieser Stellt die Hauptfunktion dar.
    constructor(){
        super();                //super() muss stets aufgerufen werden, damit wir die Methoden der übergeordneten Klasse aufrufen können
        this.loadImages(this.IMAGES_StatusBarCoins);
        this.x = 30;
        this.y = 120;
        this.width = 200;
        this.height = 60;
        this.setCollectedCoins(0);    // hier rufen wir die setPercentage() auf und geben den Anfangswert von 100 mit
    }

    //setPercentage(50);
    setCollectedCoins(coins) {
        this.coins = coins;   // aus der Prozentzahl müssen wir nun eine Zahl zwischen 0 und 5 ermitteln
        let path = this.IMAGES_StatusBarCoins[this.resolveImageIndex()];   // eines der ArrayBilder wird herausgesucht und in den 'path' hinein geladen
        this.img = this.imageCache[path];   // das aktuelle Bild soll dem Bild vom imageCache entsprechen
    }

    resolveImageIndex() { // 
        if (this.coins == 10) {
          return 5;
        } else if (this.coins > 7) {
          return 4;
        } else if (this.coins > 5) {
          return 3;
        } else if (this.coins > 3) {
          return 2;
        } else if (this.coins > 1) {
          return 1;
        } else {
          return 0;
        }
    }

}