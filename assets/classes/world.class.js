class World{
    character = new Character();        // wir haben eine Variable character definiert und dieser ein Character-Objekt als Wert zugewiesen
    endboss = new Endboss();
    // enemyChicken = new Chicken();
    // enemyChickenSmall = new ChickenSmall();
    // enemy = new Chicken();
    // ThrowableObject = new ThrowableObject();
    level = level1; // wir streichen die variablen enemies, clouds und backgroundObjects und ersetzen diese durch level 0 level1. Somit greifen wir zurück auf die Variablen, welche in der Klasse level1 gespeichert sind.
    canvas;
    ctx;
    keyboard;

    camera_x = 0;    // Der Minuswert sorgt dafür, dass das Bild auf der X-Achse nach Links verschoben wird
    music_sound = new Audio('assets/audio/7_music_1_salsa loca2.wav');
    throwBottle_sound = new Audio('assets/audio/8_throw.wav');
    coin_sound = new Audio('assets/audio/10_coin.wav');
    collectBottle_sound = new Audio('assets/audio/2_bottle_opening.wav');
    bottleSmash_sound = new Audio('assets/audio/4_glass2.wav');
    squeal_sound = new Audio ('assets/audio/11_squeal_1.wav');
    hurt_sound = new Audio ('assets/audio/12_hurt2.wav');
    death_sound = new Audio ('assets/audio/16_death.mp3');
    jumpOnEnemy_sound = new Audio ('assets/audio/13_gethit_1.wav');
    endbossAppearance_sound = new Audio ('assets/audio/19_dramatic sound_3.wav');

    statusBar = new StatusBar();
    StatusBarEndboss = new StatusBarEndboss();
    StatusBarBottles = new StatusBarBottles();
    StatusBarCoins = new StatusBarCoins();
    bottlesThrown = [];
    collectedBottles = 0;
    collectedCoins = 0;


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');          // ctx steht in aller Regel für den canvas Context
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runFaster();
        this.runEndboss();
    }


    setWorld(){             //wir geben jedem Objekt eine Referenz (sämtliche Variablen) mit auf unsere Welt. Somit können die Objekte auf die Eigenschaften der Welt zugreifen
        this.character.world = this; // hier werden die Eigenschaften der Variablen "Welt" an den Character weitergegeben. Die Variable Character kann nun auf die Variablen/ Eigenschaften der Welt zugreifen. Durch "this" gewährleisten wir die ganz aktuellen Eigenschaften der Welt in diesem Augenblick
    }


    run(){                      // diese Funktion checkt regelmäßig ob der Character mit einem enemy kollidiert
        setInterval(() => {
            this.checkCollisions();  
            this.checkThrowObjects();
            this.checkCollisionsEndboss();
            this.clearSplashAnimation();
            this.collectBottleColliding();
            this.collectCoinsColliding();
            this.checkAppearanceEndboss();
        }, 100);           // jede 1000 Millisekunden wird geprüft, ob Objekte in unserer Welt miteinadern kollidieren
    }

    runFaster() {
        setInterval(() => {
            this.enemyIsCollidingBottle();
            this.checkCollisionJumpOnEnemies();
        }, 50);
    }

    runEndboss(){
        setInterval(() => {
            this.endbossIsCollidingBottle();
            this.checkEndbossPushingCharacter();  
        }, 50);
    }

    //ENDBOSS APPEARANCE

    checkAppearanceEndboss() {
        if (this.characterReachesEndboss()) {
        this.activatingEndboss();
        } else {
        // this.hideStatusBarOfEndboss();
        }
    }

    characterReachesEndboss() {
        return this.endboss.x - this.character.x < 450;
        console.log('character has reached Endboss - distance 450');
    }

    activatingEndboss() {
        // this.statusBarEndboss.width = 200;
        // this.statusBarEndboss.height = 60;
        // this.statusBarEndbossHeart.width = 70;
        // this.statusBarEndbossHeart.height = 75;
        this.endboss.isAlarmed = true;
        console.log('endboss isAlarmed = true');
        // this.endbossAppearance_sound.play();
        // this.endbossAppearance_sound.pause();
        // pauseAudio("endbossAppearance_sound");
    }

    // hideStatusBarOfEndboss() {
    //     this.statusBarEndboss.width = 0;
    //     this.statusBarEndboss.height = 0;
    //     this.statusBarEndbossHeart.width = 0;
    //     this.statusBarEndbossHeart.height = 0;
    // }


    //ENDBOSS PUSHING CHARACTER

    checkEndbossPushingCharacter() {
        if (this.endbossCollidesCharacter()) {
        this.characterGetsPushed();
        } else {
        this.characterGetsNotPushed();
        }
    }

    endbossCollidesCharacter() {
        return this.character.isColliding(this.endboss);
    }

    characterGetsPushed() {
        this.character.getsPushed = true;
    }

    characterGetsNotPushed() {
        this.character.getsPushed = false;
    }

    // Check Collisions

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
                  
            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();       // im Falle einer Kollision mit einem Enemy wird unserem Character Lebensenergie abgezogen
                this.statusBar.setPercentage(this.character.energy);
            console.log('Colission with Character, energy', this.character.energy);
           
            if (this.character.energy > 0) {
                // this.hurt_sound.play();
            } else {
                // this.death_sound.play();
                }
            }
        });
    }

    /**
         * checks if the character is jumping on an enemy + splices a dead enemy
         */
    checkCollisionJumpOnEnemies() {
        this.level.enemies.forEach((enemy, indexOfEnemies) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.jumpOnEnemy = true;
                enemy.energy = 0;
                this.jumpOnEnemy_sound.play();
                // this.squeal_sound.play();
                this.jumpOnHead();

                setTimeout(() => {
                    console.log('splice');
                    this.level.enemies.splice(indexOfEnemies, 1);  // nachdem ein enemy getötet wurde, wird er aus dem Hauptarray enemies - in der Class "level" - gelöscht
                    this.character.jumpOnEnemy = false;
                }, 200);
            }
        })
    }

    
    jumpOnHead() {
        // console.log('jumpOnHead ist aktiv');
        this.character.speedY = 20;
      
    }


    collectBottleColliding(){
        // console.log('collectBottle ist aktiv');
        this.level.bottles.forEach((bottle, index) => { //Hier handelt es sich um ein Array
                if (this.character.isColliding(bottle)){        
                    this.level.bottles.splice(index, 1);    // in der Class 'level' wird im Array bottles ein element aus dem index gelöscht
                    this.collectedBottles++;     // in das Array 'collectedBottles' wird ein element bottles gepusht
                    this.StatusBarBottles.setCollectedBottles(this.collectedBottles);
                    // console.log(this.collectedBottles);
                    this.collectBottle_sound.play();
                }
            })
    }


    collectCoinsColliding(){
        // console.log('collectBottle ist aktiv');
        this.level.coins.forEach((coin, index) => { //Hier handelt es sich um ein Array
                if (this.character.isColliding(coin)){        
                    this.level.coins.splice(index, 1);    // in der Class 'level' wird im Array bottles ein element aus dem index gelöscht
                    this.collectedCoins++;     // in das Array 'collectedBottles' wird ein element bottles gepusht
                    this.StatusBarCoins.setCollectedCoins(this.collectedCoins);
                    this.coin_sound.play();
                } 
            })
    }


    checkCollisionsEndboss(){
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) ) {
                this.character.hitByEndboss();       // im Falle einer Kollision mit einem Enemy wird unserem Character Lebensenergie abgezogen
                this.statusBar.setPercentage(this.character.energy);
            console.log('Colission Endboss with Character, energy', this.character.energy);
            }
        });
    }

    enemyIsCollidingBottle(){
        this.bottlesThrown.forEach((bottle) => { //Hier handelt es sich um ein Array
            this.level.enemies.forEach((enemy)=>{
                if (enemy.isColliding(bottle) ) {
                    enemy.hitByBottle();
                                                                       // im Falle einer Kollision mit einem Enemy wird unserem Character Lebensenergie abgezogen
                console.log('Colission with enemy, energy', enemy.energy);
                }
            });
        })
    }

    endbossIsCollidingBottle(){
        this.bottlesThrown.forEach((bottle) => { //Hier handelt es sich um ein Array
            this.level.endboss.forEach((bossi)=>{
                if (bossi.isColliding(bottle)) {
                    bossi.hitByBottle();       //&& this.energy > 0 im Falle einer Kollision mit einem Enemy wird unserem Character Lebensenergie abgezogen
                    this.StatusBarEndboss.setPercentage(this.level.endboss[0].energy);
                console.log('Endboss collides with bottle, energy', bossi.energy);
                }
            });
        });
    }


    hitByBottle(enemy) {
        this.bottlesThrown.forEach((bottle) => {
          if (bottle.isColliding(enemy)) {
            enemy.hit();
                this.level.enemies.splice(indexOfEnemies, 1);
          }
        });
        
    }

    checkThrowObjects(){
        if(this.keyboard.KEY_D && this.collectedBottles > 0){   //wenn KEY_D gedrückt wird und der Wert der Variablen collectedBottles > 0 ist, dann wird nachfolgendes {} ausgeführt
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);   //
            this.bottlesThrown.push(bottle);
            this.collectedBottles--;    // verringert den Wert in collectedBottles um --. Das bedeutet 1.
            this.StatusBarBottles.setCollectedBottles(this.collectedBottles);
            // console.log(this.collectedBottles);
            this.throwBottle_sound.play();    // throwBottle_sound wird gespielt
        }
    }

    clearSplashAnimation(){
        this.bottlesThrown.forEach((bottle, index) => {       // vergleichbar dem i, einer regulären for-Schleife
            if (bottle.isAboveGround() == false) {   //"!"" bedeutet Verneinung
                setTimeout(() => {
                    this.bottlesThrown.splice(index, 1);  
                }, 400);
            }
        })
    }


    draw(){                         //Consolen-Aufrufbefehl für das Aufrufen einer Funktion: world.draw()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);   // wir löschen erst einmal den Inhalt unserer Speilwelt 'World'. Die Funktion bekommt zusätzlich den Context (ctx) mit übergeben.
                                                                        //CanvasRenderingContext2D.drawImage() --> drawImage(img, dx, dy);
        this.ctx.translate(this.camera_x, 0);  // Der Context (ctx)/ Die Kamera verschiebt das gezeichnete Bild (draw) auf der X-Achse, wie in der Variablen camera_x oben definiert; Der Wert 0 für die Y-Achse muss ebenfalls angegeben werden, damit der Befehl vollständig ist.
        this.addObjectsToMap(this.level.backgroundObjects);    // wir fügen unsere backgroundObjects zu unserer Map
        this.addObjectsToMap(this.level.clouds);   // wir fügen unsere Clouds zu unserer Map
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.bottlesThrown); // lokales Array bottles

        this.ctx.translate(-this.camera_x, 0); // Context(ctx)/ Kamera wird beim Bild-Zeichnen (draw) wieder zurück verschoben.
    //  ----- Space for fixed objects -----
        this.addToMap(this.statusBar); // auch die statusBar muss "gemalt" werden, damit wir sie auf dem Bildschirm angezeigt bekommen
        this.ctx.translate(this.camera_x, 0);  // Der Context (ctx)/ Die Kamera verschiebt das gezeichnete Bild (draw) auf der X-Achse, wie in der Variablen camera_x oben definiert; Der Wert 0 für die Y-Achse muss ebenfalls angegeben werden, damit der Befehl vollständig ist.
        
        //StatusBarBottles
        this.ctx.translate(-this.camera_x, 0); // Context(ctx)/ Kamera wird beim Bild-Zeichnen (draw) wieder zurück verschoben.
    //  ----- Space for fixed objects -----
        this.addToMap(this.StatusBarBottles); // auch die statusBar muss "gemalt" werden, damit wir sie auf dem Bildschirm angezeigt bekommen
        this.ctx.translate(this.camera_x, 0);  // Der Context (ctx)/ Die Kamera verschiebt das gezeichnete Bild (draw) auf der X-Achse, wie in der Variablen camera_x oben definiert; Der Wert 0 für die Y-Achse muss ebenfalls angegeben werden, damit der Befehl vollständig ist.

        //StatusBarCoins
        this.ctx.translate(-this.camera_x, 0); // Context(ctx)/ Kamera wird beim Bild-Zeichnen (draw) wieder zurück verschoben.
    //  ----- Space for fixed objects -----
        this.addToMap(this.StatusBarCoins); // auch die statusBar muss "gemalt" werden, damit wir sie auf dem Bildschirm angezeigt bekommen
        this.ctx.translate(this.camera_x, 0);  // Der Context (ctx)/ Die Kamera verschiebt das gezeichnete Bild (draw) auf der X-Achse, wie in der Variablen camera_x oben definiert; Der Wert 0 für die Y-Achse muss ebenfalls angegeben werden, damit der Befehl vollständig ist.

        // StatusBarEndboss -- diese StatusBar verschiebt sich nicht
        this.addToMap(this.StatusBarEndboss); // auch die statusBar muss "gemalt" werden, damit wir sie auf dem Bildschirm angezeigt bekommen
        

        // this.addToMap(this.coins);
        this.addObjectsToMap(this.level.enemies);  // wir fügen unsere Enemies zu unserer Map
        this.addObjectsToMap(this.level.endboss);// wir fügen unseren Endboss zu unserer Map
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


//     //GAME IS OVER

//   checkIfWonOrLost() {
//     if (this.characterDied()) {
//       this.showGameLost();
//       this.changeStyleForEndscreen();
//       this.stopAudiosAndIntervale();
//     }
//     if (this.endbossDied()) {
//       this.showGameWon();
//       this.changeStyleForEndscreen();
//       this.stopAudiosAndIntervale();
//     }
//   }

//   characterDied() {
//     return this.character.energy == 0 && !this.gameIsOver;
//   }

//   showGameLost() {
//     gameIsOver = true;
//     document.getElementById("gameOverImg").src =
//       "img/9_intro_outro_screens/game_over/oh no you lost!.png";
//     playAudio("gameLost");
//   }

//   endbossDied() {
//     return this.endboss.energy == 0 && !this.gameIsOver;
//   }

//   showGameWon() {
//     gameIsOver = true;
//     document.getElementById("gameOverImg").src =
//       "img/9_intro_outro_screens/game_over/game over!.png";
//     playAudio("gameWon");
//   }

//   changeStyleForEndscreen() {
//     document.getElementById("gameOver").classList.remove("d-none");
//     document.getElementById("mobileWalk").classList.add("d-none");
//     document.getElementById("mobileActions").classList.add("d-none");
//   }

//   stopAudiosAndIntervale() {
//     pauseAudio("endboss");
//     pauseAudio("background");
//     stopIntervale();
//   }
}