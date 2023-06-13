import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CurrentWeather,
  MeasurementSystem,
  TemperatureUnits,
} from '@inWeather/core';
import { TempUnitConvertorPipe } from '@inWeather/utils';
import { TranslocoModule } from '@ngneat/transloco';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

/**
 * Weather display class component.
 */
@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    NzIconTestModule,
    NzSwitchModule,
    FormsModule,
    TempUnitConvertorPipe,
  ],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.less'],
})
export class WeatherDisplayComponent implements OnInit {
  @Input({ required: true }) weatherData: CurrentWeather | null = null;
  @Input({ required: true }) isLoadingWeatherData = false;
  @Input({ required: true }) defaultMeasurementSystem: MeasurementSystem =
    MeasurementSystem.METRIC;
  tempUnits = TemperatureUnits;
  isMetric = true;
  performUnitConversion = false;

  /**
   * Component onInit hook
   */
  ngOnInit(): void {
    this.isMetric = this.defaultMeasurementSystem === MeasurementSystem.METRIC;
  }

  /**
   * Executes when unit switch value is changed.
   */
  onUnitChange() {
    this.performUnitConversion = false;

    if (
      this.defaultMeasurementSystem === MeasurementSystem.METRIC &&
      this.isMetric === false
    ) {
      this.performUnitConversion = true;
      return;
    }

    if (
      this.defaultMeasurementSystem === MeasurementSystem.IMPERIAL &&
      this.isMetric === true
    ) {
      this.performUnitConversion = true;
      return;
    }
  }
}
