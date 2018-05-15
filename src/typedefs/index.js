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

module.exports = typeDefs;
