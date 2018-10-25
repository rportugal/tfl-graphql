import _ from 'lodash';
import parseCacheControl from 'parse-cache-control';
import Axios from 'axios';

const STOPPOINT_BASE_URL = `${process.env.TFL_API_BASE_URL}/StopPoint`;
const commonOpts = {
  params: {
    app_id: process.env.TFL_APP_ID,
    app_key: process.env.TFL_APP_KEY
  }
};

class StopPoint {
  async getById(id: string, cacheControl: any) {
    const url = `${STOPPOINT_BASE_URL}/${id}`;
    const data = await Axios.get(url, { ...commonOpts });
    const httpCacheData = parseCacheControl(data.headers['cache-control']);

    cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
    return data.data;
  }

  async getRouteSections(naptanId: string) {
    const url = `${STOPPOINT_BASE_URL}/${naptanId}/Route`;
    const data = await Axios.get(url, {
      ...commonOpts
    });

    const keyMap: any = {
      routeSectionName: 'name'
    };

    const result = _.map(data.data, obj => _.mapKeys(obj, (_, key) => keyMap[key] || key));

    return result;
  }
}

export default StopPoint;
