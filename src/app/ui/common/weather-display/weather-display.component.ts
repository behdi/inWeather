import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CurrentWeather } from '@inWeather/core';
import { TranslocoModule } from '@ngneat/transloco';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

/**
 * Weather display class component.
 */
@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NzIconTestModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.less'],
})
export class WeatherDisplayComponent {
  @Input({ required: true }) weatherData: CurrentWeather | null = null;
  @Input({ required: true }) isLoadingWeatherData = false;
}
