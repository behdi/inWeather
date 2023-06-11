import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherSearchPageComponent } from './weather-search-page.component';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WeatherSearchPageComponent', () => {
  let component: WeatherSearchPageComponent;
  let fixture: ComponentFixture<WeatherSearchPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        WeatherSearchPageComponent,
        TranslocoTestingModule.forRoot({
          preloadLangs: true,
        }),
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
    });
    fixture = TestBed.createComponent(WeatherSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
