export enum WEATHER_ENDPOINTS {
  CURRENT = '/data/2.5/weather?lat=:lat&lon=:lon&appid=:apiKey',
}

export enum GEO_CODING_ENDPOINTS {
  DIRECT = '/geo/1.0/direct?q=:cityName&limit=:limit&appid=:apiKey',
}
