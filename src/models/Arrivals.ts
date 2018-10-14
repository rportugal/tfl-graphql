import axios from 'axios';
import parseCacheControl from 'parse-cache-control';
import convertCacheControl from '../helpers/convertCacheControl';

class Arrivals {
  @convertCacheControl(true)
  async getArrivalsForStop(naptanId: string, line: string, cacheControl: any) {
    console.log(`### Arrivals.getArrivalsForStop ${naptanId} ${line}`);
    const url = `https://api.tfl.gov.uk/Line/${line}/Arrivals/${naptanId}`;
    console.log(url);
    const data = await axios.get(url, {
      params: {
        app_id: process.env.TFL_APP_ID,
        app_key: process.env.TFL_APP_KEY
      }
    });

    const httpCacheData = parseCacheControl(data.headers['cache-control']);
    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });

    console.log('### data');
    console.log(data.data);
    return data.data;
  }
}

export default Arrivals;
