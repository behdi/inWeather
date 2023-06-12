import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { InWeatherAppComponent } from './in-weather-app.component';
import { By } from '@angular/platform-browser';
import { APP_CONFIG } from '../core/app';
import { mockAppConfig } from '../utils';

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
      providers: [
        {
          provide: APP_CONFIG,
          useValue: mockAppConfig,
        },
      ],
    });
    fixture = TestBed.createComponent(InWeatherAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render main-layout component`, () => {
    const mainLayout = fixture.debugElement.query(By.css('app-main-layout'));
    expect(mainLayout).not.toBeNull();
  });

  it(`should have Home and Favorite location as menu options`, () => {
    const menuItemsEl = fixture.debugElement.queryAll(
      By.css('.menu .ant-menu-item')
    );

    const renderedMenuItems = menuItemsEl.map(({ nativeElement }) =>
      (nativeElement as HTMLLIElement).innerText.trim()
    );

    expect(renderedMenuItems[0]).toBe('en.menu.home');
    expect(renderedMenuItems[1]).toBe('en.menu.favoriteLocations');
  });

  it(`should get logo url from app configuration`, () => {
    const logoEl = fixture.debugElement.query(By.css('.logo'))
      .nativeElement as HTMLImageElement;

    expect(logoEl.src.endsWith(mockAppConfig.PROJECT.LOGO_URL)).toBeTrue();
  });
});
