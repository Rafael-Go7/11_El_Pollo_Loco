class Character extends MovableObject{
    height = 280;
    y = 140;
    speed = 12;

    IMAGES_WALKING = [            
    'assets/img/2_character_pepe/2_walk/W-21.png',
    'assets/img/2_character_pepe/2_walk/W-22.png',
    'assets/img/2_character_pepe/2_walk/W-23.png',
    'assets/img/2_character_pepe/2_walk/W-24.png',
    'assets/img/2_character_pepe/2_walk/W-25.png',
    'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        // 'assets/img/2_character_pepe/3_jump/J-31.png',
        // 'assets/img/2_character_pepe/3_jump/J-32.png',
        // 'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png'
        // 'assets/img/2_character_pepe/3_jump/J-35.png',
        // 'assets/img/2_character_pepe/3_jump/J-36.png',
        // 'assets/img/2_character_pepe/3_jump/J-37.png',
        // 'assets/img/2_character_pepe/3_jump/J-38.png',
        // 'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [            
           'assets/img/2_character_pepe/5_dead/D-51.png',
           'assets/img/2_character_pepe/5_dead/D-52.png',
           'assets/img/2_character_pepe/5_dead/D-53.png',
           'assets/img/2_character_pepe/5_dead/D-54.png',
           'assets/img/2_character_pepe/5_dead/D-55.png',
           'assets/img/2_character_pepe/5_dead/D-56.png',
           'assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [            
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    
    ];

    IMAGES_IDLE = [            
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
        ];

    // IMAGES_IDLE_LONG = [            
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
    //     'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    //     ];
    getsPushed = false;
    world;  // hierdurch empfängt die Klasse Character die Eigenschaften der Varibalen von Welt, kann somit auf die Informationen zugreifen
    walking_sound = new Audio('assets/audio/1_walking3_concrete.wav');
    jump_sound = new Audio('assets/audio/5_jump1.wav');

    constructor(){
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);       // hierdurch wird ein Array befüllt mit den aufgelisteten Bildern/ Bildverzeichnispfaden, innerhalb von []
        this.loadImages(this.IMAGES_JUMPING);       // Das Array IMAGES_JUMPING wird geladen
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    animate(){

        setInterval(() => {
            this.walking_sound.pause();
            if(this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) { // der Character kann nur so weit auf der X-Achse nach rechts laufen wie "&& this.x < this.world.level.level_end_x";
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if(this.world.keyboard.KEY_LEFT && this.x > 0) {       // der Character kann nur so weit auf der X-Achse nach links laufen wie "&& this.x > 0";
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100; // wir verknüpfen die Bewegung des Characters mit der Variablen für die veränderte ctx/ Kamera Perspektive, welche wir in der class.world.js definiert haben. Durch das +100 verschieben wir die Kameraperspektive auf der X-Achse um +100px.

            // console.log('this speedY', this.speedY);

            if(this.world.keyboard.KEY_SPACE && !this.isAboveGround()) { // && !this.isAboveGround - der Speed soll sich nur weiter erhöhen, wenn die Bedingung der isAboveGround() Funktion erfüllt ist, siehe in der class MovableObjects. Ohne diese Bedingung würde der Character fliegen können.
                this.jump();
                this.jump_sound.play();     // Jump Sound
            }
            this.checkIfGetsPushed();

        }, 1000 / 60);

        let animations2 = setInterval(() => {
            // if(idle == true) {
            //     this.playAnimation(this.IMAGES_IDLE);
                
            // } else 
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else 
            { if(this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT) {
                //Walk animation
                this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);      

        let isAboveGround = setInterval(() => {     //damit wir clearInterval ausführen können, müssen wir dem Interval eine Variable zuweisen
            if(this.isAboveGround()) {
                // Jumping animation
                this.playAnimation(this.IMAGES_JUMPING);
                clearInterval(this.isAboveGround);  //in die clearInterval(XY) geben wir die Definition des setIntervals ein
            } 
        }, 50);

        let CharacterisHurt = setInterval(() => {   //damit wir clearInterval ausführen können, müssen wir dem Interval eine Variable zuweisen
            if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                clearInterval(this.CharacterisHurt);  //in die clearInterval(XY) geben wir die Definition des setIntervals ein
            } 
        }, 50); 
    }

   
    // clearInterval(animations2){

    // }


    // myStopFunction() {
    //     clearInterval(animations2);
    //   }

       //PUSHING BY ENDBOSS

  checkIfGetsPushed() {
    if (this.getsPushedNearStart()) {
      this.pushToStart();
    } else if (this.getsPushedFarFromStart()) {
      this.pushWithFullPower();
    }
  }

  getsPushedNearStart() {
    return this.getsPushed && this.x < this.world.endboss.powerOfPushing;
  }

  pushToStart() {
    return (this.x -= this.x);
  }

  getsPushedFarFromStart() {
    return this.getsPushed;
  }

  pushWithFullPower() {
    this.x -= this.world.endboss.powerOfPushing;
    setTimeout(() => {
      this.getsPushed = false;
    }, 100);
  }

}

