function nextGeneration(oldGeneration) {
  oldGeneration.sort((a, b) => b.fitness - a.fitness);

  let totalFitness = 0;
  oldGeneration.forEach(bird => totalFitness += bird.fitness);

  let nextGeneration = [];

  for (let i = 0; i < 20; i++) {
    nextGeneration.push(mutate(oldGeneration[0]))
  }

  for (let i = 0; i < 10; i++) {
    let bird = new Bird();
    bird.brain = oldGeneration[i].brain.copyWeights();
    nextGeneration.push(bird)
  }

  for (let i = 0; i < oldGeneration.length - 30; i++) {
    let parent_1 = pickOne(oldGeneration, totalFitness);
    let parent_2 = pickOne(oldGeneration, totalFitness);
    let child = offspring(parent_1, parent_2);
    child = mutate(child);

    nextGeneration.push(child);
  }

  return nextGeneration;
}

function pickOne(generation, totalFitness) {
  let sum = Math.random() * totalFitness;

  for (let i = 0; i < generation.length; i++) {
    sum -= generation[i].fitness;
    if (sum < 0) {
      let bird = new Bird();
      bird.brain = generation[i].brain.copyWeights();

      return bird;
    }
  }
}

function offspring(a, b) {
  let child = new Bird();

  child.brain.weights_ih.forEach((value, index) => {
    if (Math.random() < 0.5) {
      child.brain.weights_ih._data[index[0]][index[1]] = a.brain.weights_ih._data[index[0]][index[1]];
    }
    else {
      child.brain.weights_ih._data[index[0]][index[1]] = b.brain.weights_ih._data[index[0]][index[1]];
    }
  });  

  child.brain.weights_ho.forEach((value, index) => {
    if (Math.random() < 0.5) {
      child.brain.weights_ho._data[index[0]][index[1]] = a.brain.weights_ho._data[index[0]][index[1]];
    }
    else {
      child.brain.weights_ho._data[index[0]][index[1]] = b.brain.weights_ho._data[index[0]][index[1]];
    }
  }); 

  return child;
}

function mutate(bird) {
  let newBird = new Bird();
  newBird.brain = bird.brain.copyWeights();
  let mutateFactor = 1 + ((Math.random() - 0.5) * 3 + (Math.random() - 0.5));

  newBird.brain.weights_ih = newBird.brain.weights_ih.map((value) => {
    if (Math.random() < 0.1) {
      return value * mutateFactor;
    }
    else {
      return value;
    }
  }); 

  newBird.brain.weights_ho = newBird.brain.weights_ho.map((value) => {
    if (Math.random() < 0.1) {
      return value * mutateFactor;
    }
    else {
      return value;
    }
  }); 

  return newBird;
}