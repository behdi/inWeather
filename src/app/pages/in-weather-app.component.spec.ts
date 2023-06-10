import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InWeatherAppComponent } from './in-weather-app.component';

describe('InWeatherAppComponent', () => {
  let component: InWeatherAppComponent;
  let fixture: ComponentFixture<InWeatherAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InWeatherAppComponent]
    });
    fixture = TestBed.createComponent(InWeatherAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
