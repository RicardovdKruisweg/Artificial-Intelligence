class Queue {
  constructor() {
    this.items = [];
  }

  // stop een item in de queue
  enqueue(obj) {
    this.items.push(obj);
  }

  // haal het 1e item op (returnt) en verwijder deze van de this.items
  dequeue() {
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

module.exports = Queue;