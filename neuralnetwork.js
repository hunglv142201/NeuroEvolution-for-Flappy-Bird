class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;

    this.weights_ih = math.zeros(hiddenNodes, inputNodes);
    this.weights_ho = math.zeros(outputNodes, hiddenNodes);

    this.weights_ih = this.weights_ih.map(() => Math.random() * 2 - 1);
    this.weights_ho = this.weights_ho.map(() => Math.random() * 2 - 1);
  }

  sigmoid = matrix => {
    return matrix.map(value => 1 / (1 + Math.exp(-value)));
  }

  predict = (birdY, closestPipe) => {
    let inputs = [[birdY / 512], [(closestPipe.x + 52) / 288], [(closestPipe.y + 242) / 500]];
    let hidden_outputs = this.sigmoid(math.multiply(this.weights_ih, inputs));
    let outputs = this.sigmoid(math.multiply(this.weights_ho, hidden_outputs));

    return outputs;
  }

  copyWeights = () => {
    let brain = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes);

    brain.weights_ih = this.weights_ih.map(value => value);
    brain.weights_ho = this.weights_ho.map(value => value);

    return brain;
  }
}