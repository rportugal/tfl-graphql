import { gql } from 'apollo-server-express';

const typeDefs = gql`
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

  type RouteSection {
    lineId: String # TODO: change
    mode: Mode
    name: String
    lineString: String
  }

  type StopPoint {
    id: String # naptan ID
    modes: [String]
    coords: Coords
    commonName: String
    stopType: String
    additionalProperties: [AdditionalProperty]
    children: [StopPoint]
    arrivals: [Arrival]
    routeSections: [RouteSection]
  }

  type Arrival {
    naptanId: String
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
    stopPointById(naptanId: String!): StopPoint
  }
`;

export default typeDefs;
