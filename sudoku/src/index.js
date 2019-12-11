const Sudoku = require('./class/sudoku');
const time = require('./class/time');
const ai = require('./class/ai');

// const sudoku = new Sudoku('hard');
// const sudoku = new Sudoku('custom', '002000850001600000060028000000490001100000005006830090005200000900080520040900068'); // de metro van 14 mei
const sudoku = new Sudoku('custom', '000000000000003085001020000000507000004000100090000000500000073002010000000040009'); // de 'hard for brute force sudoku' van https://en.wikipedia.org/wiki/Sudoku_solving_algorithms#/media/File:Sudoku_puzzle_hard_for_brute_force.svg
const domain = sudoku.determineDomain();

time.start();
const solution = ai.solve(sudoku.field, domain);
time.stop();

console.log('Solving:');
sudoku.paint(sudoku.originalField);
console.log(`Solution (${time.ms()} ms) (${time.ms() / 1000} s):`);
sudoku.paint(solution);