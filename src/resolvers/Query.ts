export default {
  Query: {
    arrivalsForStop(obj: any, { naptanId, line }: any, { models: { Arrivals } }: any, { cacheControl }: any) {
      return Arrivals.getArrivalsForStop(naptanId, line, cacheControl);
    },
    stopPointById(obj: any, { naptanId }: any, { models: { StopPoint } }: any, { cacheControl }: any) {
      return StopPoint.getById(naptanId, cacheControl);
    },
    stopPoints(obj: any, { name }: any, { models: { StopPoint } }: any, { cacheControl }: any) {
      return StopPoint.search(name, cacheControl);
    }
  }
};
