class Pipes {
  x = 288;
  y = (Math.random() * 220 + 20) - 242;
  holeHeight = 150;
  velocity = -2;
  topPipeImage = new Image();
  bottomPipeImage = new Image();

  constructor() {
    this.topPipeImage.src = "images\\pipeNorth.png";
    this.bottomPipeImage.src = "images\\pipeSouth.png";
  }

  run = () => {
    this.x += this.velocity;
  }

  draw = context => {
    context.drawImage(this.topPipeImage, this.x, this.y);
    context.drawImage(this.bottomPipeImage, this.x, this.y + 242 + this.holeHeight);
  }
}