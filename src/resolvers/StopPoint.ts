export default {
  StopPoint: {
    async arrivals(obj: any, _: any, { models: { Arrivals } }: any, { cacheControl }: any) {
      // TODO: fix modes, lines
      const result = await Arrivals.getArrivalsForStop(obj.naptanId, 'District', cacheControl);
      return result;
    },
    children(obj: any) {
      return obj.children;
    },
    commonName(obj: any) {
      return obj.commonName || obj.name;
    },
    coords(obj: any) {
      return { lat: obj.lat, lon: obj.lon };
    },
    routeSections(obj: any, _: any, { models: { StopPoint } }: any, { cacheControl }: any) {
      return StopPoint.getRouteSections(obj.naptanId);
    }
  }
};
