export default {
  StopPoint: {
    async arrivals(obj: any, _: any, { models: { Arrivals } }: any, { cacheControl }: any) {
      // TODO: fix modes, lines
      console.log('-> obj here');
      console.log(obj);
      const result = await Arrivals.getArrivalsForStop(obj.naptanId, 'District', cacheControl);
      console.log('-> result here');
      console.log(result);
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
