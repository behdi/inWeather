import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService, CurrentWeather } from '@inWeather/core';
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
  imports: [CommonModule, ReactiveFormsModule, NzSelectModule, NzIconModule],
  templateUrl: './weather-search-page.component.html',
  styleUrls: ['./weather-search-page.component.less'],
})
export class WeatherSearchPageComponent implements OnInit {
  /**
   * API service reference.
   */
  private readonly _api = inject(ApiService);

  /**
   * Behavior subject that emits a value any time user inputs in the search box.
   */
  searchChange$ = new BehaviorSubject<string | null>(null);

  /**
   * Is loading indicator.
   */
  isLoading = false;

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

  /**
   * Component onInit hook.
   */
  ngOnInit(): void {
    this.optionList$ = this._getOptionsListStream();
    this.weatherData$ = this._getLocationWeatherDataStream();
  }

  /**
   * Executes anytime input is changed.
   *
   * @param value - value entered into search box.
   */
  onSearchChange(value: string) {
    if (!value) return;

    this.hasError = false;
    this.isLoading = true;
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
      tap(() => (this.isLoading = false))
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
      switchMap((data) => {
        return this._api.getCurrentWeather(
          data.lat.toString(),
          data.lon.toString()
        );
      })
    );
  }
}
