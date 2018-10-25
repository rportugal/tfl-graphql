import _ from 'lodash';
import axios from 'axios';
import parseCacheControl from 'parse-cache-control';

class Arrivals {
  async getArrivalsForStop(naptanId: string, line: string, cacheControl: any) {
    const url = `${process.env.TFL_API_BASE_URL}/Line/${line}/Arrivals/${naptanId}`;
    const data = await axios.get(url, {
      params: {
        app_id: process.env.TFL_APP_ID,
        app_key: process.env.TFL_APP_KEY
      }
    });

    const httpCacheData = parseCacheControl(data.headers['cache-control']);
    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });

    const keyMap: any = {
      id: 'naptanId'
    };

    const result = _.map(data.data, obj => _.mapKeys(obj, (_, key) => keyMap[key] || key));
    return result;
  }
}

export default Arrivals;
