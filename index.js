let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let game = new Game(canvas);

game.startNewGame();