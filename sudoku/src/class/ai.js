class Ai {

  static solve(field, domain) {

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (field[rowIndex][colIndex] !== 0) continue; // veld is al ingevuld, skip.

        for (let i = 0; i < domain[rowIndex][colIndex].length; i++) {
          let possibleValue = domain[rowIndex][colIndex][i];
          if (this.isValid(field, rowIndex, colIndex, possibleValue)) {
            field[rowIndex][colIndex] = possibleValue;
            if (this.solve(field, domain)) return field; // check de andere velden
            else field[rowIndex][colIndex] = 0; // als de recursie uit eindelijk niet geldig is is het veld dus niet geldig! (backtrack)
          }
        }
        return false;
      }
    }
    return field;
  }

  static isValid(board, rowIndex, colIndex, possibleValue) {
    for (let i = 0; i < 9; i++) {

      let rowIndexToCheck = Math.floor(rowIndex / 3) * 3; // verkrijg de bovenste rij van de '3x3 grid'
      rowIndexToCheck += Math.floor(i / 3); // na elke 3 loops komt er een rij bij om zo de 2e & 3e rij van de '3x3 grid' te checken

      let colIndexToCheck = Math.floor(colIndex / 3) * 3; // verkrijg de meest linkse kolom van de '3x3 grid'
      colIndexToCheck += (i % 3); // bij de 4e stap moet de kolom weer terug naar index 0 aangezien je 1 row naar beneden gaat en daar de 1e value weer van wilt checken

      /**
       * Constraints
       * board[rowIndex][i] => check de gehele rij (horizontaal) of het getal voorkomt
       * board[i][colIndex] => check de gehele kolom (verticaal) of het getal voorkomt
       * board[rowIndexToCheck][colIndexToCheck] => check de gehele '3x3 grid' of het getal voorkomt
       * 
       * zo ja => dan is het getal NIET geldig
       * zo nee => dan is het getal MOGELIJK geldig
       */
      if (board[rowIndex][i] == possibleValue || board[i][colIndex] == possibleValue || board[rowIndexToCheck][colIndexToCheck] == possibleValue) return false;
    }
    return true;
  }

}

module.exports = Ai;