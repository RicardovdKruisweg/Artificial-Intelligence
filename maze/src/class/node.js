class Node {
  constructor(x, y, parent) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }

  getpos() {
    return [this.x, this.y];
  }
}

module.exports = Node;