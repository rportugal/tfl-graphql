const appId = process.env.TFL_APP_ID;
const appKey = process.env.TFL_APP_KEY;
const tfl = require('tfl.api')(appId, appKey);
const parseCacheControl = require('parse-cache-control');

class StopPoint {
  async getById(id, cacheControl) {
    console.log('StopPoint.getById');
    const data = await tfl.stoppoint.byId(id);
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
    return data.body;
  }
}

module.exports = StopPoint;
