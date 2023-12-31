export const enum WEATHER_ENDPOINTS {
  CURRENT = '/data/2.5/weather?lat=:lat&lon=:lon&units=:units',
}

export const enum GEO_CODING_ENDPOINTS {
  DIRECT = '/geo/1.0/direct?q=:cityName&limit=:limit',
}
