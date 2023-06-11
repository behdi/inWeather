// Please keep in mind that we're technically leaking the API key here
// and this is not what you want to do in a real production app.
// But as this is mostly a test project and the api key is free
// and of no importance to us, we'll just let it be as is.
import { Environment } from '@inWeather/core';

export const environment: Environment = {
  WEATHER_API: {
    BASE_URL: 'http://api.openweathermap.org',
    API_KEY: '25facc681db44eeb6d544cc1f1e739b8',
  },
};
