class Cache {
  constructor(data) {
    this.data = data;
    this.timestamp = Date.now();
  }
}

module.exports = Cache;
