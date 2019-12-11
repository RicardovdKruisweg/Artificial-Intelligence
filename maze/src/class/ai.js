const Node = require('./node');
const Queue = require('./queue');

class AI {
  static exists(arr, search) {
    return arr.filter((pos) => pos[0] === search[0] && pos[1] === search[1]).length > 0;
  }

  static findSolution(maze) {
    // variable assingment
    let queue = new Queue();
    const beginPoint = maze.getPosition('begin');
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
        return path.reverse();
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
}

module.exports = AI;