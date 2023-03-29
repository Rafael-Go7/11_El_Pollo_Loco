class BackgroundObject extends MovableObject {
    // x = 100;
    // y = 300;
    height = 480;                               //this.height
    width = 720;
    

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x; 
        this.y = 480 - this.height; // 480 (Höhe des Canvas) - 400 (Höhe des eingefügten Bilds) = y-Koordinate
       
    }
}