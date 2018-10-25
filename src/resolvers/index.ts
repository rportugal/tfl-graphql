import Arrival from './Arrival';
import Query from './Query';
import StopPoint from './StopPoint';

const resolvers: any = {
  ...Query,
  ...Arrival,
  ...StopPoint
};

export default resolvers;
