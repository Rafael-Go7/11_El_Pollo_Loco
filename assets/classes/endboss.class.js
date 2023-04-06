class Endboss extends MovableObject{
    height = 250;
    width = 250;
    energy = 200;
    y = 190;

    IMAGES_WALKING = [            
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
        ];
    
    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

        isAlarmed = false;
        powerOfPushing = 50;

        constructor() {
            super().loadImage(this.IMAGES_WALKING[0]);
            this.loadImages(this.IMAGES_WALKING);
            this.loadImages(this.IMAGES_ALERT);
            this.loadImages(this.IMAGES_ATTACK);
            this.loadImages(this.IMAGES_HURT);
            this.loadImages(this.IMAGES_DEAD);      
            this.x = 2250;
            this.animateEndboss();
        }

        // animate(){
           
        //     setInterval(() => {
        //         this.playAnimation(this.IMAGES_WALKING);
        //     }, 200);

        // }

        animateEndboss() {
            setInterval(() => {
              if (this.isAlarmed == true) {
                this.playAnimation(this.IMAGES_ALERT);
              } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
              } else if (this.wasHit()) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.attackMove();
              } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
              } 
            }, 200);
          }
        
          attackMove() {
            if (this.isAtStart()) {
              this.cannotMove();
            } else {
              super.moveLeft();
            }
          }


}