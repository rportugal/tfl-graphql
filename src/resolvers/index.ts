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
    arrivalsForStop(obj: any, { naptanId, line }: any, { models: { Arrivals } }: any, { cacheControl }: any) {
      return Arrivals.getArrivalsForStop(naptanId, line, cacheControl);
    },
    stopPointById(obj: any, { id }: any, { models: { StopPoint } }: any, { cacheControl }: any) {
      return StopPoint.getById(id, cacheControl);
    }
  },
  Arrival: {
    lineId(obj: any, args: any, ctx: any, { cacheControl }: any) {
      cacheControl.setCacheHint({ maxAge: 1234 });
    }
  },
  StopPoint: {
    coords(obj: any) {
      return { lat: obj.lat, lon: obj.lon };
    },
    children(obj: any) {
      return obj.children;
    }
  }
};

export default resolvers;
