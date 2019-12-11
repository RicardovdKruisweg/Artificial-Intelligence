class Maze {

  constructor() {
    this.wall = 0; // wall
    this.open = 1; // open space
    this.begp = 2; // begin position
    this.endp = 3; // endpoint

    // voor de syntax highligting
    var wall = this.wall;
    var open = this.open;
    var begp = this.begp;
    var endp = this.endp;

    this.maze = [
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
      [wall, endp, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, wall, open, open, wall, wall, wall, wall, wall, wall, wall, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, wall, open, wall, wall, wall, wall],
      [wall, open, open, wall, wall, wall, wall, wall, wall, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, open, open, wall, wall, wall, wall, wall, wall, wall, wall, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, begp, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall]
    ];

    /*
    this.oldmaze = [
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
      [wall, endp, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, wall, open, open, wall, wall, wall, wall, wall, wall, wall, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, wall, open, open, open, open, open, open, open, open, wall, open, wall, wall, wall, wall],
      [wall, open, open, wall, wall, wall, wall, wall, wall, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, wall],
      [wall, open, open, open, open, wall, wall, wall, wall, wall, wall, wall, wall, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, begp, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall]
    ];

    this.maze = [
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
      [wall, begp, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, open, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, wall, wall, wall, wall, wall, wall, wall, wall, wall, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, wall, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, wall, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, wall, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, wall, open, open, open, open, open, open, open, open, open, wall, open, open, wall],
      [wall, open, open, open, open, open, open, open, open, open, open, open, open, open, open, open, open, open, open, open, open, wall, open, endp, wall],
      [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
    ];
    */
  }

  // kijk of de positie geen muur is
  canMoveToPosition(position) {
    const row = this.maze[position[0]];
    const col = row[position[1]];
    return col !== this.wall && col !== this.begp;
  }

  // verkrijgt een bepaalde positie
  getPosition(type) {
    if (type === 'begin') type = this.begp;
    else if (type === 'end') type = this.endp;
    const beginPointRow = this.maze.findIndex((row) => row.includes(type));
    const row = this.maze[beginPointRow];
    const beginPointCol = row.findIndex((col) => col == type);
    return [beginPointRow, beginPointCol];
  }

  // visualisatie
  paintMap(path, gen) {
    const chalk = require('chalk');

    if (!gen) return;

    console.log('Gen: ', gen);

    this.maze.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {

        const hasWalked = path.filter((pos) => pos[0] === rowIndex && pos[1] === colIndex).length > 0;

        if (col === this.open && hasWalked) {
          process.stdout.write(chalk.black.bgYellow(' X '));
        } else {
          if (col === this.wall) process.stdout.write(chalk.bgCyan(' X '));
          else if (col === this.open) process.stdout.write(chalk.bgWhite(' X '));
          else if (col === this.begp) process.stdout.write(chalk.bgRed(' X '));
          else if (col === this.endp) process.stdout.write(chalk.bgGreen(' X '));
        }
      });
      process.stdout.write('\r\n');
    });

    process.stdout.write('\r\n');
  }

}

module.exports = Maze;