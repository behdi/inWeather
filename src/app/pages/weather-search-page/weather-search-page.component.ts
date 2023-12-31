import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { APP_CONFIG, ApiService, CurrentWeather } from '@inWeather/core';
import { CardComponent, WeatherDisplayComponent } from '@inWeather/ui';
import { TranslocoModule } from '@ngneat/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { WeatherSearchOption } from './types/search-options.type';

/**
 * Weather search page component class.
 */
@Component({
  selector: 'app-weather-search-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    TranslocoModule,
    CardComponent,
    WeatherDisplayComponent,
  ],
  templateUrl: './weather-search-page.component.html',
  styleUrls: ['./weather-search-page.component.less'],
})
export class WeatherSearchPageComponent implements OnInit {
  /**
   * API service reference.
   */
  private readonly _api = inject(ApiService);

  private readonly _appConfig = inject(APP_CONFIG);

  /**
   * Behavior subject that emits a value any time user inputs in the search box.
   */
  searchChange$ = new BehaviorSubject<string | null>(null);

  /**
   * Is loading options indicator.
   */
  isLoadingOptions = false;

  /**
   * Is loading weather data indicator.
   */
  isLoadingWeatherData = false;

  /**
   * Has error indicator.
   */
  hasError = false;

  /**
   * Selected option by the user.
   */
  selectedValue: WeatherSearchOption['value'] | null = null;

  /**
   * Stream containing search results based on user's input.
   */
  optionList$?: Observable<WeatherSearchOption[]>;

  /**
   * Form control for city search input.
   */
  searchInputCtrl = new FormControl<WeatherSearchOption['value'] | null>(null);

  /**
   * Weather data for selected location.
   */
  weatherData$?: Observable<CurrentWeather>;

  defaultMeasurementSystem = this._appConfig.PROJECT.MEASUREMENT_SYSTEM;

  /**
   * Component onInit hook.
   */
  ngOnInit(): void {
    this.optionList$ = this._getOptionsListStream();
    this.weatherData$ = this._getLocationWeatherDataStream();
    //   coord: {
    //     lon: 51.3896,
    //     lat: 35.6893,
    //   },
    //   weather: [
    //     {
    //       id: 801,
    //       main: 'Clouds',
    //       description: 'few clouds',
    //       icon: '02d',
    //     },
    //   ],
    //   base: 'stations',
    //   main: {
    //     temp: 30.02,
    //     feels_like: 28.32,
    //     temp_min: 29.9,
    //     temp_max: 30.1,
    //     pressure: 1011,
    //     humidity: 22,
    //   },
    //   visibility: 10000,
    //   wind: {
    //     speed: 3.09,
    //     deg: 190,
    //   },
    //   clouds: {
    //     all: 20,
    //   },
    //   dt: 1686634757,
    //   sys: {
    //     type: 2,
    //     id: 47737,
    //     country: 'IR',
    //     sunrise: 1686619087,
    //     sunset: 1686671450,
    //   },
    //   timezone: 12600,
    //   id: 112931,
    //   name: 'Tehran',
    //   cod: 200,
    // });
  }

  /**
   * Executes anytime input is changed.
   *
   * @param value - value entered into search box.
   */
  onSearchChange(value: string) {
    if (!value) return;

    this.hasError = false;
    this.isLoadingOptions = true;
    this.searchChange$.next(value);
  }

  /**
   * Returns stream that listens to user inputs and searches server for possible cities.
   *
   * @returns stream of city data based on user input
   */
  private _getOptionsListStream() {
    return this.searchChange$.pipe(
      filter((val): val is string => val !== null),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value) =>
        this._api.getCityGeoData(value).pipe(
          catchError(() => {
            this.hasError = true;
            return of([]);
          })
        )
      ),
      map((data) =>
        data.map((d) => ({ value: { lat: d.lat, lon: d.lon }, text: d.name }))
      ),
      tap(() => (this.isLoadingOptions = false))
    );
  }

  /**
   * Listens to selected location and returns weather data for it.
   *
   * @returns stream containing weather info for selected location.
   */
  private _getLocationWeatherDataStream() {
    return this.searchInputCtrl.valueChanges.pipe(
      filter((data): data is WeatherSearchOption['value'] => data !== null),
      tap(() => (this.isLoadingWeatherData = true)),
      switchMap((data) => {
        const { lat, lon } = data;

        return this._api.getCurrentWeather(lat.toString(), lon.toString());
      }),
      tap(() => (this.isLoadingWeatherData = false))
    );
  }
}
