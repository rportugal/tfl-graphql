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

  type TimeTable {
    a: String
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
    # lines:
    #bikePoint(id: String): BikePoint
    #bikePointsByRadius(center: Coords!, radius: Float): [BikePoint]
    #   bikePointsByBounds()
    stopPointById(naptanId: String!): StopPoint
    stopPoints(name: String!): [StopPoint]
    #timetableFromStationToStation(station1: String!, station2: String!, line: Line!): TimeTable
    timetableOutbound(station: String!, line: Line!): TimeTable
    #timetableInbound(station: String!, line: Line!): TimeTable
  }
`;

export default typeDefs;
