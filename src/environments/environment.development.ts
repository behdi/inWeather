// Please keep in mind that we're technically leaking the API key here
// and this is not what you want to do in a real production app.
// But as this is mostly a test project and the api key is free
// and of no importance to us, we'll just let it be as is.

import { DEFAULT_APP_CONFIG, Environment } from '@inWeather/core';

export const environment: Environment = {
  ...DEFAULT_APP_CONFIG,
  WEATHER_API: {
    BASE_URL: 'https://api.openweathermap.org',
    API_KEY: '7b4fa149865448cc62b6357bdd351382',
  },
};
