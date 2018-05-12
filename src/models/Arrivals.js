const axios = require('axios');
const parseCacheControl = require('parse-cache-control');

class Arrivals {
  async getArrivalsForStop(naptanId, line, cacheControl) {
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

module.exports = Arrivals;
