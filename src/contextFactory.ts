import StopPoint from './models/StopPoint';
import Arrivals from './models/Arrivals';

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

export default ContextFactory;
