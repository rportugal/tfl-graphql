const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { ApolloEngine } = require('apollo-engine');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

const ContextFactory = require('./contextFactory');

// TODO: https://gist.github.com/i-like-robots/a4608cbdf21d979d9452
const app = express();
app.use(cors());

// const engine = new ApolloEngine({
//   apiKey: process.env.API_KEY
// });

// engine.listen({
//   port: 3000,
//   expressApp: app
// });
const PORT = 4001;

const typeDefs = `
type AdditionalProperty {
  category: String
  key: String
  value: String
}

enum Line {
  Bakerloo
  Central
  Circle
  District
  HammersmithCity
  Jubilee
  Metropolitan
  Northern
  Piccadilly
  Victoria
  WaterlooCity
}

enum Mode {
  tube
  bus
}

#type BikePoint {
#    
#}

type Coords {
  lat: Float!
  lon: Float!
}  

type StopPoint {
  naptanId: String
  modes: [String]
  coords: Coords
  commonName: String
  stopType: String
  additionalProperties: [AdditionalProperty]
  children: [StopPoint]
}

type TimeTable {
  a: String
}

type Arrival {
  id: String
  platformName: String
  timeToStation: Int
  vehicleId: String
  destinationName: String
  destinationNaptanId: String
  modeName: Mode
  stationName: String
  lineName: String
  lineId: String
  currentLocation: String
}

type Query {
  arrivalsForStop(naptanId: String!, line: Line!): [Arrival]
  # lines:
  #bikePoint(id: String): BikePoint
  #bikePointsByRadius(center: Coords!, radius: Float): [BikePoint]
  #   bikePointsByBounds()
  stopPointById(id: String!): StopPoint
  #timetableFromStationToStation(station1: String!, station2: String!, line: Line!): TimeTable
  timetableOutbound(station: String!, line: Line!): TimeTable
  #timetableInbound(station: String!, line: Line!): TimeTable
} 
`;
const resolvers = {
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
  Query: {
    arrivalsForStop(
      obj,
      { naptanId, line },
      {
        models: { Arrivals }
      },
      { cacheControl }
    ) {
      return Arrivals.getArrivalsForStop(naptanId, line, cacheControl);
    },
    stopPointById(
      obj,
      { id },
      {
        models: { StopPoint }
      },
      { cacheControl }
    ) {
      return StopPoint.getById(id, cacheControl);
    }
  },
  Arrival: {
    lineId(obj, args, ctx, { cacheControl }) {
      cacheControl.setCacheHint({ maxAge: 1234 });
    }
  },
  StopPoint: {
    coords(obj) {
      return { lat: obj.lat, lon: obj.lon };
    },
    children(obj) {
      return obj.children;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: ContextFactory.create(),
    // tracing: true,
    cacheControl: true
  })
);
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); //

// tfl
//   .place({ lat: 123, lon: 987, radius: 100 })
//   .then(r => console.log(r))
//   .catch(e => console.error(e));

// tfl.accidentstats(2015).then(r => console.log(r.headers));
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = {
  typeDefs,
  resolvers
}