export default {
  StopPoint: {
    coords(obj: any) {
      return { lat: obj.lat, lon: obj.lon };
    },
    children(obj: any) {
      return obj.children;
    }
  }
};
