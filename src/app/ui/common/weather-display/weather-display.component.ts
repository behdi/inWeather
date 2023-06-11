import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { CurrentWeather } from '@inWeather/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Weather display class component.
 */
@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NzIconModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.less'],
})
export class WeatherDisplayComponent {
  @Input({ required: true }) weatherData: CurrentWeather | null = null;
  @Input({ required: true }) isLoadingWeatherData = false;
}
