export default {
  StopPoint: {
    children(obj: any) {
      return obj.children;
    },
    commonName(obj: any) {
      return obj.commonName || obj.name;
    },
    coords(obj: any) {
      return { lat: obj.lat, lon: obj.lon };
    },
    naptanId(obj: any) {
      return obj.naptanId || obj.id;
    }
  }
};
