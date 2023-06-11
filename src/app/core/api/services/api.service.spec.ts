import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment.development';
import { GEO_CODING_ENDPOINTS, WEATHER_ENDPOINTS } from '../models';
import { GeoData } from '../interfaces';
import { CurrentWeather } from '../interfaces/current-weather.model';

describe('ApiServiceService', () => {
  let service: ApiService;
  let httpClient: HttpTestingController;

  const baseUrl = environment.WEATHER_API.BASE_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`API URL construction methods`, () => {
    it(`should concatenate base url to given endpoint`, () => {
      const url = service.getURL('/test.json');
      expect(url).toBe(`${baseUrl}/test.json`);
    });

    it(`should replace colon parameters in url with given param object`, () => {
      const apiEndpoint = '/test/:user/isAuthenticated?returnJson=:returnJson';

      const url = service.getURL(apiEndpoint, {
        user: 'JohnSmith',
        returnJson: 'true',
      });

      expect(url).toBe(
        `${baseUrl}/test/JohnSmith/isAuthenticated?returnJson=true`
      );
    });
  });

  describe(`GeoData fetching`, () => {
    const mockGeoData: GeoData[] = [
      {
        name: 'Tehran',
        lat: 0,
        lon: 0,
        country: 'IR',
      },
      {
        name: 'San Francisco',
        lat: 0,
        lon: 0,
        country: 'US',
      },
    ];

    const verifyGeoDataEndpoint = (cityName = 'tehran', limit = 10) => {
      const url = service.getURL(GEO_CODING_ENDPOINTS.DIRECT, {
        cityName: cityName,
        limit: limit.toString(),
        apiKey: environment.WEATHER_API.API_KEY,
      });

      return httpClient.expectOne({
        method: 'GET',
        url,
      });
    };

    it(`should call correct endpoint to fetch GeoData`, () => {
      service.getCityGeoData('tehran', 5).subscribe();
      const { request } = verifyGeoDataEndpoint('tehran', 5);

      expect(request.method).toBe('GET');
      expect(request.url).toBe(
        'https://api.openweathermap.org/geo/1.0/direct?q=tehran&limit=5&appid=7b4fa149865448cc62b6357bdd351382'
      );
    });

    it(`should have a limit of 10 by default, if not specified otherwise`, () => {
      service.getCityGeoData('tehran').subscribe();
      const { request } = verifyGeoDataEndpoint('tehran');

      expect(request.url.includes('&limit=10')).toBeTrue();
    });

    it(`should return an array of GeoData objects`, () => {
      service.getCityGeoData('tehran', 10).subscribe((res) => {
        expect(res).toEqual(mockGeoData);
      });

      const req = verifyGeoDataEndpoint();
      req.flush(mockGeoData);
    });
  });

  describe(`CurrentWeather fetching`, () => {
    const mockCurrentWeather: CurrentWeather = {
      coord: {
        lon: 10.99,
        lat: 44.34,
      },
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      base: 'stations',
      main: {
        temp: 298.48,
        feels_like: 298.74,
        temp_min: 297.56,
        temp_max: 300.05,
        pressure: 1015,
        humidity: 64,
        sea_level: 1015,
        grnd_level: 933,
      },
      visibility: 10000,
      wind: {
        speed: 0.62,
        deg: 349,
        gust: 1.18,
      },
      rain: {
        '1h': 3.16,
      },
      clouds: {
        all: 100,
      },
      dt: 1661870592,
      sys: {
        type: 2,
        id: 2075663,
        country: 'IT',
        sunrise: 1661834187,
        sunset: 1661882248,
      },
      timezone: 7200,
      id: 3163858,
      name: 'Zocca',
      cod: 200,
    };

    const verifyCurrentWeatherEndpoint = (
      lat = '0',
      lon = '0',
      units = 'metric'
    ) => {
      const url = service.getURL(WEATHER_ENDPOINTS.CURRENT, {
        lat,
        lon,
        units,
        apiKey: environment.WEATHER_API.API_KEY,
      });

      return httpClient.expectOne({
        method: 'GET',
        url,
      });
    };
    it(`should call correct endpoint to fetch currentWeather data`, () => {
      service.getCurrentWeather('0', '0', 'imperial').subscribe();
      const { request } = verifyCurrentWeatherEndpoint('0', '0', 'imperial');

      expect(request.method).toBe('GET');
      expect(request.url).toBe(
        'https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&units=imperial&appid=7b4fa149865448cc62b6357bdd351382'
      );
    });

    it(`should metric unit by default`, () => {
      service.getCurrentWeather('0', '0').subscribe();
      const { request } = verifyCurrentWeatherEndpoint('0', '0', 'metric');

      expect(request.url.includes('&units=metric')).toBeTrue();
    });

    it(`should return an object of CurrentWeather`, () => {
      service.getCurrentWeather('0', '0').subscribe((res) => {
        expect(res).toEqual(mockCurrentWeather);
      });

      const req = verifyCurrentWeatherEndpoint();
      req.flush(mockCurrentWeather);
    });
  });
});
