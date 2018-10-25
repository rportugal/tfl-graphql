Demo: https://tfl-graphql.herokuapp.com/graphql

Example query:
```
{
  stopPointById(naptanId: "940GZZLUCWP") {
    commonName
    id
    modes
    stopType
    coords {
      lat
      lon
    }
    arrivals {
      platformName
      timeToStation
    }
    routeSections {
      lineId
      mode
      lineString
    }
  }
}

```