const StopPoint = require('./models/StopPoint');
const Arrivals = require('./models/Arrivals');

class ContextFactory {
  static create() {
    return {
      models: {
        StopPoint: new StopPoint(),
        Arrivals: new Arrivals()
      }
    };
  }
}

module.exports = ContextFactory;
