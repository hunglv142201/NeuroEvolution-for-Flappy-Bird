class Bird {
  x = 50;
  y = 200;
  velocity = 0;
  gravity = 0.4;
  jumpForce = -8;
  image = new Image();
  brain = new NeuralNetwork(3, 6, 1) // This will help the bird decide whether it should jump not by itself
  fitness = 0; // for genetic

  constructor() {
    this.image.src = "images\\bird.png";
  }

  fly = () => {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  flap = () => {
    this.velocity = this.jumpForce;
  }

  draw = context => {
    context.save();
    context.translate(this.x + 19, this.y + 13 + this.velocity);
    context.rotate(this.velocity * 3 * Math.PI / 180);
    context.drawImage(this.image, -19, -13, 38, 26);
    context.restore();
  }
}