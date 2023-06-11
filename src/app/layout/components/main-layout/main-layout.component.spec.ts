import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { MenuItem } from '../../models';
import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  const mockLogo = 'logo.svg';

  const mockMenuItems: MenuItem[] = [
    {
      text: 'Mock menu 1',
      routerLink: '/mock1',
      isDisabled: false,
      isSelected: false,
      isMatchRouter: false,
      isMatchRouterExact: false,
    },
    {
      text: 'Mock menu 2',
      routerLink: '/mock2',
      isDisabled: false,
      isSelected: false,
      isMatchRouter: false,
      isMatchRouterExact: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainLayoutComponent, NzIconTestModule, RouterTestingModule],
    });
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    component.logo = mockLogo;
    component.menuItems = mockMenuItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should always render given logo`, () => {
    const logoDebugEl = fixture.debugElement.query(By.css('.logo'));
    const logoEl = logoDebugEl.nativeElement as HTMLImageElement;

    expect(logoDebugEl).not.toBeNull();
    expect(logoEl.src.endsWith(mockLogo)).toBeTrue();
  });

  describe('Menu tests', () => {
    const getMenuDebugEl = () => fixture.debugElement.query(By.css('.menu'));

    const getMenuItemDebugEl = () => {
      const menuDebugEl = getMenuDebugEl();
      return menuDebugEl.queryAll(By.css('[nz-menu-item]'));
    };

    it(`shouldn't render any menu item in the header if menu items aren't provided`, () => {
      component.menuItems = undefined;
      fixture.detectChanges();
      const menuEl = getMenuDebugEl();
      expect(menuEl).toBeNull();
    });

    it(`should render given menu items in the header`, () => {
      const menuDebugEl = getMenuDebugEl();

      const renderedMenuItems = getMenuItemDebugEl().map((el) =>
        (el.nativeElement as HTMLLIElement).innerText.trim()
      );

      expect(menuDebugEl).not.toBeNull();
      expect(renderedMenuItems[0]).toBe(mockMenuItems[0].text);
      expect(renderedMenuItems[1]).toBe(mockMenuItems[1].text);
    });
  });
});
