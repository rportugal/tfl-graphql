const appId = process.env.TFL_APP_ID;
const appKey = process.env.TFL_APP_KEY;
const tfl = require('tfl.api')(appId, appKey);
import parseCacheControl from 'parse-cache-control';

// function log(target, key, descriptor) {
//   console.log(`${key} was called!`);

//   // TODO: call original method
// }

class StopPoint {
  // @convertCacheControl
  // @log
  async getById(id: string, cacheControl: any) {
    console.log('StopPoint.getById');
    const data = await tfl.stoppoint.byId(id);
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
    return data.body;
  }

  // async getAllStopsByType() {}

  async search(name: string, cacheControl: any) {
    const data = await tfl.stoppoint.search(name, { modes: 'tube' });
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
    return data.body.matches;
  }
}

export default StopPoint;
