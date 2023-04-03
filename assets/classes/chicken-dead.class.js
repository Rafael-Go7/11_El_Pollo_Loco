class DeadChicken extends MovableObject {
    height = 90;
    width = 90;


    constructor(posX, posY) {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.x = posX;
        this.y = posY;
        // this.animate();
    }

    // animate(){

    //     setInterval(() => {
            
    //     })
    // }
}