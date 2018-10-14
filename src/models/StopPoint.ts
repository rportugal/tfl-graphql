const appId = process.env.TFL_APP_ID;
const appKey = process.env.TFL_APP_KEY;
const tfl = require('tfl.api')(appId, appKey);
import parseCacheControl from 'parse-cache-control';

class StopPoint {
  async getById(id: string, cacheControl: any) {
    console.log('StopPoint.getById');
    const data = await tfl.stoppoint.byId(id);
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
    return data.body;
  }

  // async getAllStopsByType() {}
}

export default StopPoint;
