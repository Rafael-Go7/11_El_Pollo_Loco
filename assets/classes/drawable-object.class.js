class DrawableObject {
    x = 120;
    y = 280; 
    height = 150;
    width = 100;
    img;
    imageCache = [{}];
    currentImage = 0;



    //loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);    // ctx benötigen wir um den Context (ctx) zu haben, damit die Funktionalität gewährleistet wird.
    }


    drawFrame(ctx) {

        if(this instanceof Character || this instanceof Chicken){        //instanceof Methode - alles in den {} wird nur ausgeführt, wenn das Objekt eine Instanz von Character oder (||) von Chicken ist
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    

    /**param@ {Array} arr - ['img/image1.png','img/image2.png', ...]     ganz, ganz viele Bilderin einem Array*/

    loadImages(arr){        // innerhalb der Funktion bennen wir das Array "arr". Dieses geben wir hier in die Funktion ein. Dieses Array wird nun befüllt mit imgs
        arr.forEach((path) => {         //wir iterieren nun durch die Schleife durch
            let img = new Image();  // Innerhalb der Schleife: Ess wird eine neue Variable mit einem neuen Bild angelegt
            img.src = path;      // wir laden das Bild in das Objekt hinein  // hier greifen wir auf eine Variable innerhalb der Funktion zu. Deshalb wird kein this. benutzt. Die Variable bleibt somit lediglich innerhalb der Funktion {} gültig. 
            this.imageCache[path] = img;    //Bilder werden in das Array "imageCache []" hinein geladen //wir laden nun viele Bilder in unser Array; erneut schreiben wir this.imageCache weil wir dieser Variablen in in Code-Zeile 7, mit Content befüllen wollen, welcher im gesamten Objekt valide ist. Immer wenn wir this. sagen, dann ist die Variable immer überall im Objekt gültig. Ansonsten ist sie das nicht. 
        });                     //mit imageCache[key] greifen wir auf die Key-Kategorie innerhalb des Arrays zu
    
    }



}