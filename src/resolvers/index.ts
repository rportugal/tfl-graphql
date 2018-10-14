import Arrival from './Arrival';
import Query from './Query';
import StopPoint from './StopPoint';

const resolvers: any = {
  // Line {
  //   Bakerloo
  //   Central
  //   Circle
  //   District
  //   HammersmithCity
  //   Jubilee
  //   Metropolitan
  //   Northern
  //   Piccadilly
  //   Victoria
  //   WaterlooCity
  // },
  ...Query,
  ...Arrival,
  ...StopPoint
};

export default resolvers;
