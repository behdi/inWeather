import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { WeatherDisplayComponent } from './weather-display.component';

describe('WeatherDisplayComponent', () => {
  let component: WeatherDisplayComponent;
  let fixture: ComponentFixture<WeatherDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        WeatherDisplayComponent,
        TranslocoTestingModule.forRoot({
          preloadLangs: true,
        }),

        NzIconModule,
      ],
    });
    fixture = TestBed.createComponent(WeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
