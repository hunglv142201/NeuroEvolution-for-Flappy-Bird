# NeuroEvolution-for-Flappy-Bird
Using neuroevolution algorithm to teach machine learn to play Flappy Bird and beat the game !!

Open the index.html in the game folder to watch the birds figuring out themselves beating the game

# General idea of the algorithm

Using genetic algorithm to "train" neural network

Instead of having 1 bird, we will generate a lots of birds (because why not ?)
Each of them will have their own randomize brain (atually neural network) and this brain will help the bird to decide by themselves whether should jump or not
Each of them has an unique (randomize) brain, because of that, some of them will perform better than the others
We will take the best ones to breed a new generation using offspring and mutate method
The next generation are children of the best ones in the previous generation, it makes sense that they will perform better than the previous one, of course there will be some in the new generation performing poorly but we, playing as the god, will eliminate the poor ones and use the best ones to generate the next generation
And we will keep doing that until the birds will be smart enough to beat the game !
