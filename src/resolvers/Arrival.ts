export default {
  Arrival: {
    lineId(obj: any, args: any, ctx: any, { cacheControl }: any) {
      cacheControl.setCacheHint({ maxAge: 1234 });
    }
  }
};
