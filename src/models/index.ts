import StopPoint from './StopPoint';
import Arrivals from './Arrivals';

const createModels = () => ({
  StopPoint: new StopPoint(),
  Arrivals: new Arrivals()
});

export default createModels;
