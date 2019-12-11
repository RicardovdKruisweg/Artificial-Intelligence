class Sudoku {

  constructor(difficulty = 'easy', seed = '') {
    /* sudoku's exported from http://www.sudoku.org.pl/solver.html */
    switch (difficulty) {
      case 'easy':
        seed = '008300006030600950900080043000000420875000300000516800007000000503900600109820030';
        break;
      case 'medium':
        seed = '006000014000036097490517000010050240020600105060000039100060073007000000000095000';
        break;
      case 'hard':
        seed = '004605000080400090000083000040000006108000240020306900000002000076004580003500400';
        break;
    }
    this.field = this.parseString(seed);
    this.originalField = this.parseString(seed);
  }

  /**
   * AC-3: vind het domain van de row,col
   */
  determineDomain() {
    let domain = [];
    this.field.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        values = values.filter(item => !row.includes(item)); // filter horizontaal

        for(let i = 0; i < 9; i++) {
          values = values.filter(item => item !== this.field[i][colIndex]); // filter verticaal
          let rowIndexToCheck = Math.floor(rowIndex / 3) * 3;
          let colIndexToCheck = Math.floor(colIndex / 3) * 3;
          rowIndexToCheck += Math.floor(i / 3);
          colIndexToCheck += (i % 3);
          values = values.filter(item => item !== this.field[rowIndexToCheck][colIndexToCheck]); // filter 3x3 grid
        }
        if(!domain[rowIndex]) domain[rowIndex] = []; // voorkomt reference error
        domain[rowIndex][colIndex] = values;
      });
    });
    return domain;
  }

  parseString(sudoku) {
    let field = [];

    let parseRows = (string) => string.match(/.{9}/g);
    let parseCols = (string) => string.match(/.{1}/g);

    let rows = parseRows(sudoku);
    rows.forEach((row, rowIndex) => {
      let cols = parseCols(row);
      cols.forEach((col, colIndex) => cols[colIndex] = Number(col)); // parsen naar een nummer
      field[rowIndex] = cols;
    });

    return field;
  }

  paint(field) {
    const chalk = require('chalk');

    process.stdout.write('\r\n');
    field.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 0) col = ' '; // formatting voor originalField zodat je makkelijker kan zien wat vooraf ingevuld was
        if (this.originalField[rowIndex][colIndex] === col || col === ' ') process.stdout.write(chalk.bgWhiteBright.grey(` ${col} `)); // veld was al ingevuld in de seed
        else process.stdout.write(chalk.bgWhite.black(` ${col} `)); // veld ingevuld door de AI

        if (colIndex === 2 || colIndex === 5) process.stdout.write(chalk.bgBlack.black(' X ')); // spacing tussen de blokken
      });
      process.stdout.write('\r\n');
      if (rowIndex === 2 || rowIndex === 5) process.stdout.write('\r\n'); // spacing tussen de blokken
    });
    process.stdout.write('\r\n');
  }

}

module.exports = Sudoku;