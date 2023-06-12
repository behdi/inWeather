import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockAppConfig } from '@inWeather/utils';
import { APP_CONFIG } from '../app';
import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { apiKeyInterceptor } from './api-key.interceptor';

describe('ApiKeyInterceptor', () => {
  let mockHandler: { handle: HttpHandlerFn };
  let mockHandlerSpy: jasmine.Spy;

  const constructHttpReq = (url: string) => {
    return new HttpRequest('GET', url);
  };

  const runInterceptor = (
    req: HttpRequest<unknown>,
    handler: HttpHandlerFn
  ) => {
    TestBed.runInInjectionContext(() => {
      apiKeyInterceptor(req, handler);
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: mockAppConfig,
        },
      ],
    });

    mockHandler = {
      handle: (req: HttpRequest<unknown>) => of(new HttpResponse(req)),
    };
    mockHandlerSpy = spyOn(mockHandler, 'handle');
  });

  it(`should return same req if url is not from weather api`, () => {
    const httpReq = constructHttpReq('https://google.com/somewhere');

    runInterceptor(httpReq, mockHandler.handle);

    expect(mockHandlerSpy).toHaveBeenCalledOnceWith(httpReq);
  });

  it(`should append API key to urls queryparams if url is equal to weather api and has existing queryparams`, () => {
    const url = `${mockAppConfig.WEATHER_API.BASE_URL}/anytime?where=here`;
    const httpReq = constructHttpReq(url);
    const modifiedReq = httpReq.clone({
      url: `${url}&appid=${mockAppConfig.WEATHER_API.API_KEY}`,
    });

    runInterceptor(httpReq, mockHandler.handle);

    expect(mockHandlerSpy).toHaveBeenCalledOnceWith(modifiedReq);
  });

  it(`should append API key as a query param to url if url is equal to weather api`, () => {
    const url = `${mockAppConfig.WEATHER_API.BASE_URL}/anytime`;
    const httpReq = constructHttpReq(url);
    const modifiedReq = httpReq.clone({
      url: `${url}?appid=${mockAppConfig.WEATHER_API.API_KEY}`,
    });

    runInterceptor(httpReq, mockHandler.handle);

    expect(mockHandlerSpy).toHaveBeenCalledOnceWith(modifiedReq);
  });
});
