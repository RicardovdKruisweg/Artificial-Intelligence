class Time {
  static start() {
    this.start = new Date().getTime();
  }

  static stop() {
    this.stop = new Date().getTime();
  }

  static ms() {
    return this.stop - this.start;
  }
}

module.exports = Time;