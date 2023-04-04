class Coin extends MovableObject {
    // x = 50;
    // y = 150;
    height = 145;
    width = 145;
    IMAGES_COIN = ['assets/img/8_coin/coin_1.png', 'assets/img/8_coin/coin_2.png'];
    // offset = {
    //   top: 40,
    //   left: 40,
    //   right: 40,
    //   bottom: 40,
    // };
  
    constructor(x, y) {
      super().loadImage('assets/img/8_coin/coin_1.png');
      this.loadImages(this.IMAGES_COIN);
      this.x = x;
      this.y = y;
      this.animateCoins();
    }
  
    animateCoins() {
      setInterval(() => {
       this.playAnimation(this.IMAGES_COIN);
      }, 1500);
    }
  }
  