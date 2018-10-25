import _ from 'lodash';
import parseCacheControl from 'parse-cache-control';
import Axios from 'axios';

// function log(target, key, descriptor) {
//   console.log(`${key} was called!`);

//   // TODO: call original method
// }

const STOPPOINT_BASE_URL = `${process.env.TFL_API_BASE_URL}/StopPoint`;

class StopPoint {
  // @convertCacheControl
  // @log
  async getById(id: string, cacheControl: any) {
    const url = `${STOPPOINT_BASE_URL}/${id}`;
    const data = await Axios.get(url, {
      params: {
        app_id: process.env.TFL_APP_ID,
        app_key: process.env.TFL_APP_KEY
      }
    });
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
    return data.data;
  }

  // async getAllStopsByType() {}

  async getRouteSections(naptanId: string) {
    const url = `${STOPPOINT_BASE_URL}/${naptanId}/Route`;
    const data = await Axios.get(url, {
      params: {
        app_id: process.env.TFL_APP_ID,
        app_key: process.env.TFL_APP_KEY
      }
    });

    const keyMap: any = {
      routeSectionName: 'name'
    };

    const result = _.map(data.data, obj => _.mapKeys(obj, (_, key) => keyMap[key] || key));

    return result;
  }

  // async search(name: string, cacheControl: any) {
  //   // const data = await tfl.stoppoint.search(name, { modes: 'tube' });
  //   const url = `${process.env.TFL_API_BASE_URL}/StopPoint/Search`;
  //   const httpCacheData = parseCacheControl(data.headers['cache-control']);

  //   cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });

  //   const keyMap: any = {
  //     id: 'naptanId'
  //   };

  //   const result = _.map(data.body.matches, obj => _.mapKeys(obj, (_, key) => keyMap[key] || key));
  //   console.log(result);
  //   return result;
  // }
}

export default StopPoint;
