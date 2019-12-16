class Game {
  backgroundImage = new Image();
  groundImage = new Image();
  birds = [];
  deadBirds = [];
  pipes = [];
  gameOver = false;
  score = 0;
  highScore = 0;
  count = 0;
  populationSize = 200;
  generationCount = 0;

  constructor(canvas, populationSize) {
    this.backgroundImage.src = "images\\bg.png";
    this.groundImage.src = "images\\fg.png";

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");

    if (populationSize !== undefined) {
      this.populationSize = populationSize;
    }
  }

  startNewGame = () => {
    this.pipes = [];
    this.gameOver = false;
    this.score = 0;
    this.count = 0;
    this.generationCount++;
    if (this.deadBirds.length === 0) {
      for (let i = 0; i < this.populationSize; i++) {
        this.birds.push(new Bird());
      }
    }
    else {
      this.birds = nextGeneration(this.deadBirds);
      this.deadBirds = [];
    }

    this.gameLoop();
  }

  draw = () => {  
    // draw background image
    this.context.drawImage(this.backgroundImage, 0, 0);
  
    // draw pipes
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].draw(this.context);
    }
  
    // draw ground image
    this.context.drawImage(this.groundImage, 0, 430);
  
    // draw the bird
    this.birds.forEach(bird => bird.draw(this.context));
  
    // draw information
    context.fillStyle = "#FF0000";
    context.font = "bold 12px verdana, sans-serif";

    context.fillText("Generation: " + this.generationCount, 20, 455);
    context.fillText("Score: " + this.score, 20, 470);
    context.fillText("High score: " + this.highScore, 20, 485);
    context.fillText("Birds alive: " + this.birds.length + " / " + this.populationSize, 20, 500);
  }

  logic = () => {
    if (this.birds.length === 0) {
      this.gameOver = true;
    }

    // add pair of pipe
    if (this.count % 100 === 0) {
      this.pipes.push(new Pipes());
  
      if (this.pipes.length > 3) {
        this.pipes.splice(0, 1);
      }
    }

    // let the pipes run
    for (let i = 0; i < this.pipes.length; i++) {
      this.pipes[i].run();

      // scoring
      if (this.birds.length > 0) {
        if (this.birds[0].x === this.pipes[i].x + 52) {
          this.score++;
        }
      }
    }

    // high score
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }

    for (let i = this.birds.length - 1; i >= 0; i--) {
      // Bird deciding by itself whethere it should jump or not
      if (this.birds[i].brain.predict(this.birds[i].y, this.closestPipe())._data > 0.5) {
        this.birds[i].flap();
      }

      this.birds[i].fly();

      // check whether if the bird flys through a hole
      for (let j = 0; j < this.pipes.length; j++) {
        if (this.birds[i].x === this.pipes[j].x + 52) {
          this.birds[i].fitness += 50 * this.score;
          break;
        }
      }
      this.birds[i].fitness++;

      // check if the bird is dead by hitting edges  
      if (this.birds[i].y < -20 || this.birds[i].y > 400) {
        this.deadBirds.push(this.birds.splice(i, 1)[0]);
      }
      else {
        for (let j = 0; j < this.pipes.length; j++) {
          // check if the bird is dead by hitting pipes  
          if ((this.birds[i].x + 38 > this.pipes[j].x && this.birds[i].x < this.pipes[j].x + 52) && 
            (this.birds[i].y < this.pipes[j].y + 242 || this.birds[i].y + 26 > this.pipes[j].y + 242 + this.pipes[j].holeHeight)) {
            this.deadBirds.push(this.birds.splice(i, 1)[0]);
            break;
          }
        }
      }
    };
  }

  gameLoop = () => {
    this.draw();
    this.logic();
    this.count++;

    if (!this.gameOver) {
      requestAnimationFrame(this.gameLoop);
    }
    else {
      setTimeout(() => {
        this.startNewGame();
      }, 500);
    }
  }

  closestPipe = () => {
    let closestDistance = Infinity;
    let closestPipe;
  
    for (let i = 0; i < this.pipes.length; i++) {
      if (this.pipes[i].x + 52 - this.birds[0].x > 0 && this.pipes[i].x - this.birds[0].x < closestDistance) {
        closestPipe = this.pipes[i];
        closestDistance = closestPipe.x + 52 - this.birds[0].x;
      }
    }
  
    return closestPipe;
  }
}