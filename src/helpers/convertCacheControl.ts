import parseCacheControl from 'parse-cache-control';

function convertCacheControl(value: boolean) {
  console.log('# convertCacheControl evaluated');
  return function(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log(`${key} was called`);
    console.log('-> target');
    console.log(target);
    console.log('-> key');
    console.log(key);
    console.log('-> descriptor');
    console.log(descriptor);
    const originalMethod = descriptor.value;
    // console.log('-> originalMethod');
    // console.log(originalMethod);
  };

  // const httpCacheData = parseCacheControl(data.headers['cache-control']);
  // cacheControl.setCacheHint({ maxAge: httpCacheData['max-age'] });
}

export default convertCacheControl;
