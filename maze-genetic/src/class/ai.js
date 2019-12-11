// https://towardsdatascience.com/introduction-to-genetic-algorithms-including-example-code-e396e98d8bf3
const Queue = require('./queue');
const Node = require('./node');

class AI {

  static exists(arr, search) {
    return arr.filter((pos) => pos[0] === search[0] && pos[1] === search[1]).length > 0;
  }

  static calculateDistance(maze, beginPoint) {
    // variable assingment
    let queue = new Queue();
    const targetPoint = maze.getPosition('end');

    const beginNode = new Node(beginPoint[0], beginPoint[1]);
    const targetNode = new Node(targetPoint[0], targetPoint[1]);

    queue.enqueue(beginNode);
    let path = [];
    let visited = [];

    const possibleMoves = ['u', 'r', 'd', 'l'];

    // Loop door de queue
    while (!queue.isEmpty()) {

      // Haal eerste element uit de queue
      let curNode = queue.dequeue();

      // Controlleer of dit element de target is (zo ja: dan is het spel gewonnen)
      if (curNode.x === targetNode.x && curNode.y === targetNode.y) {
        // loop door alle parents (voorgaande stappen)
        while (curNode.parent) {
          path.push(curNode.getpos());
          curNode = curNode.parent;
        }
        return path.length;
      }

      // Loop door de mogelijke moves
      for (let i = 0; i < possibleMoves.length; i++) {
        let row = curNode.x;
        let col = curNode.y;
        if (possibleMoves[i] == 'u') row -= 1;
        else if (possibleMoves[i] == 'r') col += 1;
        else if (possibleMoves[i] == 'd') row += 1;
        else if (possibleMoves[i] == 'l') col -= 1;

        // Controleer of de positie beschikbaar is
        if (maze.canMoveToPosition([row, col])) {
          let node = new Node(row, col, curNode);
          // Kijk of de posite al bezocht is
          if (!this.exists(visited, node.getpos())) {
            // Zoe niet voeg de nieuwe node toe aan de queue en zet hem in de lijst met bezochte nodes
            visited.push(node.getpos());
            queue.enqueue(node);
          }
        }
      }
    }
  }


  static findSolution(maze) {
    const max_generations = 5000;
    const population_size = 500;
    const mutationIncrement = 0.00000015;
    const fastestRoute = this.calculateDistance(maze, maze.getPosition('begin'));
    const chromosome_length = Math.floor(maze.maze.length * maze.maze[0].length);
    const mutation_rate = 0.0089;
    let highscore = 0;
    let numberOfHighscores = 0;
    console.log(`Starting length ${chromosome_length}`);

    let population = new Population(population_size, chromosome_length, mutation_rate);

    const points = {
      HITWALL: -5,
      ALREADYWALKED: -5,
      MOVED: 3,
      ENDPOINT: 100,
      MOVEDFURTHER: -50,
      MOVEDCLOSER: 20
    };

    /** Loop door de generations */
    for (let gen = 1; gen <= max_generations; gen++) {

      /** Loop door de population (= verschillende maze runners) */
      for (let i = 0; i < population.population.length; i++) {
        const chromosome = population.population[i];
        let position = maze.getPosition('begin');
        let walked = 0;
        let walls = 0;
        let moved = 0;
        /** Loop door de genes van deze chromosome (= move set) */
        for (let o = 0; o < chromosome.genes.length; o++) {
          const move = chromosome.genes[o];

          let x = position[0];
          let y = position[1];

          if (move === 'U') x -= 1;
          else if (move === 'R') y += 1;
          else if (move === 'D') x += 1;
          else if (move === 'L') y -= 1;
          let tempPosition = [x, y];

          /** Fitness function */
          const hitWall = !maze.canMoveToPosition(tempPosition);
          const hasWalked = chromosome.walked.filter((pos) => pos[0] === x && pos[1] === y).length > 0;
          const hasFoundEnd = tempPosition === maze.getPosition('end');

          const canMove = !hitWall && !hasWalked;

          if (hitWall) {
            chromosome.fitness += points.HITWALL;
            walls++;
          }
          else if (hasWalked) {
            walked++;
            chromosome.fitness += points.ALREADYWALKED;
          }
          if (maze.getPosition('end')[0] === x && maze.getPosition('end')[1] === y && chromosome.endFound === false) {
            if (o === fastestRoute) {
              console.log(`Snelste route gevonden!, ${o} stappen waren benodigd, de route is gevonden in generatie ${gen}`);
              return maze.paintMap(chromosome.walked, gen);
            }
            if (highscore === 0) {
              chromosome.endFound = true;
              numberOfHighscores++;
              population.chromosome_length -= 1;
              population.mutationChance += (mutationIncrement * numberOfHighscores);
              maze.paintMap(chromosome.walked, gen);
              console.log(`Uitweg gevonden, ${o} stappen benodigd, generatie: ${gen}, punten verzameld ${chromosome.fitness}// Walls ${walls}, Walked ${walked}, Moved ${moved}`);
              highscore = chromosome.fitness;
            }
            if (chromosome.fitness > highscore) {
              chromosome.endFound = true;
              numberOfHighscores++;
              highscore = chromosome.fitness;
              population.chromosome_length -= 1;
              population.mutationChance += (mutationIncrement * numberOfHighscores);
              maze.paintMap(chromosome.walked, gen);
              console.log(population.mutationChance);
              console.log(`Betere Uitweg gevonden, ${o} stappen benodigd in lengte ${population.chromosome_length}, generatie: ${gen}, punten verzameld ${chromosome.fitness} // Walls ${walls}, Walked ${walked}, Moved ${moved}`);
            }
            chromosome.fitness += (chromosome_length - chromosome.walked.length) * points.ENDPOINT;
            //return maze.paintMap(chromosome.walked, gen);
          }

          if (canMove) {
            moved++;
            if (chromosome.endFound === false) chromosome.fitness += points.MOVED;
            position = tempPosition;
            chromosome.walked.push(position);
          }


        }

        let diff = (fastestRoute - this.calculateDistance(maze, chromosome.walked[chromosome.walked.length - 1]));
        if (diff < 0) chromosome.fitness += points.MOVEDFURTHER;
        else {
          chromosome.fitness += diff * points.MOVEDCLOSER;
        }
      }
      population.population.sort((a, b) => b.fitness - a.fitness);
      if (gen !== max_generations) population.startNewGeneration();
      if (gen === max_generations) {
        maze.paintMap(population.population[0].walked, gen);
      }
    }
  }
}

class Population {

  /** Maakt een initiele population aan */
  constructor(population_size, chromosome_length, mutationChance) {
    this.population = [];
    this.mutationChance = mutationChance;
    this.population_size = population_size;
    this.chromosome_length = chromosome_length;
    for (let i = 0; i < population_size; i++) {
      const chromosome = new Chromosome();
      chromosome.newRandom(chromosome_length);
      this.population[i] = chromosome;
    };
  }

  startNewGeneration() {

    /** Verkrijg de 2 fitste */
    this.population.sort((a, b) => b.fitness - a.fitness);
    /** Alleen de 2 fitste mogen blijven */
    let fittest = this.population[0].genes;
    let secondfittest = this.population[1].genes;

    this.population = [];
    const fittestChromosome = new Chromosome();
    fittestChromosome.addGenes(fittest);
    this.population.push(fittestChromosome);
    const secondfittestChromosome = new Chromosome();
    secondfittestChromosome.addGenes(secondfittest);
    this.population.push(secondfittestChromosome);

    /** Crossover */
    for (let i = 0; i < (this.population_size / 2) - 2; i++) {
      let crossOverPoint = Math.floor(Math.random() * fittest.length);
      let newGenes1 = fittest.slice(0, crossOverPoint).concat(secondfittest.slice(crossOverPoint, secondfittest.length));
      let newGenes2 = secondfittest.slice(0, crossOverPoint).concat(fittest.slice(crossOverPoint, fittest.length));

      let difference = newGenes1.length - this.chromosome_length;

      newGenes1.splice(crossOverPoint, difference);
      newGenes2.splice(crossOverPoint, difference);

      /** Mutation */
      for (let i = 0; i < newGenes1.length; i++) {
        const rolledDice = Math.random() < this.mutationChance;
        if (rolledDice) {
          let gene = newGenes1[i];
          let randomMoves = ['U', 'R', 'D', 'L'];
          randomMoves.pop(gene);
          newGenes1[i] = randomMoves[Math.floor(Math.random() * randomMoves.length)];
        }
      }
      for (let i = 0; i < newGenes2.length; i++) {
        const rolledDice = Math.random() > this.mutationChance;
        if (rolledDice) {
          let gene = newGenes2[i];
          let randomMoves = ['U', 'R', 'D', 'L'];
          randomMoves.pop(gene);
          newGenes2[i] = randomMoves[Math.floor(Math.random() * randomMoves.length)];
        }
      }

      /** Add to population */
      let newChromosome1 = new Chromosome();
      newChromosome1.addGenes(newGenes1);
      this.population.push(newChromosome1);
      let newChromosome2 = new Chromosome();
      newChromosome2.addGenes(newGenes2);
      this.population.push(newChromosome2);
      return this.population;
    }

  }

}

class Chromosome {

  constructor() {
    this.fitness = 0;
    this.genes = [];
    this.walked = [];
    this.endFound = false;
  }

  addGenes(genes) {
    this.genes = genes;
  }

  /** Maakt een nieuwe chromosome aan en vult deze met random moves (genes) */
  newRandom(chromosome_length) {
    let randomMoves = ['U', 'R', 'D', 'L'];
    for (let i = 0; i < chromosome_length; i++) {
      this.genes[i] = randomMoves[Math.floor(Math.random() * randomMoves.length)];
    }
  }

}

module.exports = AI;