import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { InWeatherAppComponent } from './in-weather-app.component';

describe('InWeatherAppComponent', () => {
  let component: InWeatherAppComponent;
  let fixture: ComponentFixture<InWeatherAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        InWeatherAppComponent,
        TranslocoTestingModule.forRoot({
          preloadLangs: true,
        }),
        RouterTestingModule,
        NzIconTestModule,
      ],
    });
    fixture = TestBed.createComponent(InWeatherAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
