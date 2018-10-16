import _ from 'lodash';
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

  async getRouteSections(naptanId: string) {
    const data = await tfl.stoppoint.route(naptanId);
    console.log('-> getRouteSections');
    console.log(data.body);
    const keyMap: any = {
      routeSectionName: 'name'
    };

    const result = _.map(data.body, obj => _.mapKeys(obj, (_, key) => keyMap[key] || key));

    return result;
  }

  async search(name: string, cacheControl: any) {
    const data = await tfl.stoppoint.search(name, { modes: 'tube' });
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });

    const keyMap: any = {
      id: 'naptanId'
    };

    const result = _.map(data.body.matches, obj => _.mapKeys(obj, (_, key) => keyMap[key] || key));
    console.log(result);
    return result;
  }
}

export default StopPoint;
