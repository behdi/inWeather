import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApiService, GeoData } from '@inWeather/core';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';

/**
 * Weather search page component class.
 */
@Component({
  selector: 'app-weather-search-page',
  standalone: true,
  imports: [
    CommonModule,
    NzAutocompleteModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './weather-search-page.component.html',
  styleUrls: ['./weather-search-page.component.less'],
})
export class WeatherSearchPageComponent implements OnInit {
  private readonly _api = inject(ApiService);

  inputCtrl = new FormControl<string>('');
  options$?: Observable<GeoData[]>;

  /**
   * Component onInit hook.
   */
  ngOnInit(): void {
    this.options$ = this.inputCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((inputTxt): inputTxt is string => inputTxt !== null),
      switchMap((inputTxt) => {
        return this._api.getCityGeoData(inputTxt, 5);
      })
    );
  }
}
