const Maze = require('./class/maze');
const ai = require('./class/ai');

const maze = new Maze();
const path = ai.findSolution(maze);
maze.paintMap(path);
