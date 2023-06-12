import { AppConfig } from '@inWeather/core';

export const mockAppConfig: AppConfig = {
  PROJECT: {
    LOGO_URL: 'logo.svg',
    AVAILABLE_LANGUAGES: ['en'],
    DEFAULT_LANG: 'en',
  },
  WEATHER_API: {
    BASE_URL: 'https://test.weather.com',
    API_KEY: '1234',
  },
};
