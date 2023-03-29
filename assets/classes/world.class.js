class World{
    character = new Character();        // wir haben eine Variable character definiert und dieser ein Character-Objekt als Wert zugewiesen
    level = level1; // wir streichen die variablen enemies, clouds und backgroundObjects und ersetzen diese durch level 0 level1. Somit greifen wir zurück auf die Variablen, welche in der Klasse level1 gespeichert sind.
    canvas;
    ctx;
    keyboard;
    camera_x = 0;    // Der Minuswert sorgt dafür, dass das Bild auf der X-Achse nach Links verschoben wird
    music_sound = new Audio('assets/audio/7_music_1_salsa loca2.wav');
    statusBar = new StatusBar();
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');          // ctx steht in aller Regel für den canvas Context
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();    
    }

    setWorld(){             //wir geben jedem Objekt eine Referenz (sämtliche Variablen) mit auf unsere Welt. Somit können die Objekte auf die Eigenschaften der Welt zugreifen
        this.character.world = this; // hier werden die Eigenschaften der Variablen "Welt" an den Character weitergegeben. Die Variable Character kann nun auf die Variablen/ Eigenschaften der Welt zugreifen. Durch "this" gewährleisten wir die ganz aktuellen Eigenschaften der Welt in diesem Augenblick
    }

    run(){                      // diese Funktion checkt regelmäßig ob der Character mit einem enemy kollidiert
        setInterval(() => {
            this.checkCollisions();  
            this.checkThrowObjects();   
        }, 200);           // jede 1000 Millisekunden wird geprüft, ob Objekte in unserer Welt miteinadern kollidieren
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) ) {
                this.character.hit();       // im Falle einer Kollision mit einem Enemy wird unserem Character Lebensenergie abgezogen
                this.statusBar.setPercentage(this.character.energy);
            // console.log('Colission with Character, energy', this.character.energy);
            }
        });
    }

    checkThrowObjects(){
        if(this.keyboard.KEY_D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);   //
            this.throwableObjects.push(bottle);
        }   
    }

    draw(){                         //Consolen-Aufrufbefehl für das Aufrufen einer Funktion: world.draw()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);   // wir löschen erst einmal den Inhalt unserer Speilwelt 'World'. Die Funktion bekommt zusätzlich den Context (ctx) mit übergeben.
                                                                        //CanvasRenderingContext2D.drawImage() --> drawImage(img, dx, dy);
        this.ctx.translate(this.camera_x, 0);  // Der Context (ctx)/ Die Kamera verschiebt das gezeichnete Bild (draw) auf der X-Achse, wie in der Variablen camera_x oben definiert; Der Wert 0 für die Y-Achse muss ebenfalls angegeben werden, damit der Befehl vollständig ist.
        this.addObjectsToMap(this.level.backgroundObjects);    // wir fügen unsere backgroundObjects zu unserer Map
        this.addObjectsToMap(this.level.clouds);   // wir fügen unsere Clouds zu unserer Map
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); // Context(ctx)/ Kamera wird beim Bild-Zeichnen (draw) wieder zurück verschoben.
    //  ----- Space for fixed objects -----
        this.addToMap(this.statusBar); // auch die statusBar muss "gemalt" werden, damit wir sie auf dem Bildschirm angezeigt bekommen
        this.ctx.translate(this.camera_x, 0);  // Der Context (ctx)/ Die Kamera verschiebt das gezeichnete Bild (draw) auf der X-Achse, wie in der Variablen camera_x oben definiert; Der Wert 0 für die Y-Achse muss ebenfalls angegeben werden, damit der Befehl vollständig ist.
        
        
        this.addObjectsToMap(this.level.enemies);  // wir fügen unsere Enemies zu unserer Map
        this.addToMap(this.character);  // wir fügen unseren Character zu unserer Map
        this.ctx.translate(-this.camera_x, 0); // Context(ctx)/ Kamera wird beim Bild-Zeichnen (draw) wieder zurück verschoben.
        



        //Draw() wird immer wieder aufgerufen, um einen reibungslosen Ablauf von Grafiken zu gewährleisten - ergebnis ist eine Animation (bewegtes Bild), selbes Prinzip wie Kinemathograf
        let self = this;
        requestAnimationFrame(function(){   // requestAnimationFrame() führt dieFunktion so häufig aus, wie die Grafikkarte es hergibt
            self.draw();
        });

        // setInterval(() => {
        //     this.music_sound.play();    // Musik wird gespielt
        // }, 10);
    }

    addObjectsToMap(objects){
        objects.forEach(o => {      // füge Objekte hinzu
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection){      //Spiegelfunktion; zunächst checken wir mit mo.otherDirection, ob unser Objekt eine andere Richtung hat
            this.flipImage(mo);     // ruft die funktion flipImage auf, übergibt param 'mo'
        }

        mo.draw(this.ctx);          // ruft die mo.draw Funktion auf, übergibt this.ctx als Param
        mo.drawFrame(this.ctx);     // ruft die mo.drawFrame Funktion auf, übergibt this.ctx als Param

        if(mo.otherDirection){
            this.flipImageBack(mo); // ruft die flipImageBack Funktion auf, übergibt 'mo' als Param
        }
    }

    flipImage(mo){
        this.ctx.save();    // falls, ja, dann speichern wir die aktuellen Einstellungen von unserem Kontext// Context (ctx) hat Eigenschaften der Spielwelt, welche standardmäßig eingefügt werden sollen.
        this.ctx.translate(mo.width, 0);    // dann verändern wir die Methode wie wir die Bilder einfügen// wir verschieben das Bild um die breite des jeweiligen Elements
        this.ctx.scale(-1, 1);  // und spiegeln an der Y-Achse
        mo.x = mo.x * -1;   // damit die X-Koordinate richtig angezeigt wird, müssen wir diese Zeile Code für eine fehlerfreie Spiegelung des Bilds noch hinzufügen. Wir müssen die X-koordinate vollständig umdrehen.

    }

    flipImageBack(mo){
        mo.x = mo.x * -1;   // damit die X-Koordinate richtig angezeigt wird, müssen wir diese Zeile Code für eine fehlerfreie Spiegelung des Bilds noch hinzufügen. Wir müssen die X-koordinate vollständig umdrehen.
        this.ctx.restore();

    }

}