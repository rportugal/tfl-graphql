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

module.exports = resolvers;
