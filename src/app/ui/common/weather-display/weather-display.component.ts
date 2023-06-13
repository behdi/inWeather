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
  /**
   * Weather data to be rendered.
   */
  @Input({ required: true }) weatherData: CurrentWeather | null = null;

  /**
   * Weather data loading status.
   */
  @Input({ required: true }) isLoadingWeatherData = false;

  /**
   * Application's default measurement system.
   */
  @Input({ required: true }) defaultMeasurementSystem =
    MeasurementSystem.METRIC;

  /**
   * Status of unit conversion switch.
   *
   * States whether the switch is in metric mode.
   */
  isMetric = true;

  /**
   * Unit we should convert the temperature to.
   *
   * If set to null, no conversion must take place.
   */
  conversionTarget: TemperatureUnits | null = null;

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
    this.conversionTarget = null;

    if (
      this.defaultMeasurementSystem === MeasurementSystem.METRIC &&
      this.isMetric === false
    ) {
      this.conversionTarget = TemperatureUnits.FAHRENHEIT;
      return;
    }

    if (
      this.defaultMeasurementSystem === MeasurementSystem.IMPERIAL &&
      this.isMetric === true
    ) {
      this.conversionTarget = TemperatureUnits.CELSIUS;
      return;
    }
  }
}
