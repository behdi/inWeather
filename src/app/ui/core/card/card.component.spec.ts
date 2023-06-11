import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

/**
 * Mock testing component.
 */
@Component({
  selector: 'app-mock-component',
  template: `
    <app-card>
      <div class="projected-content">Test content</div>
    </app-card>
  `,
})
class MockComponent {}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [CardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have container with class of 'card'`, () => {
    const cardDiv = fixture.debugElement.query(By.css('.card'));

    expect(cardDiv).not.toBeNull();
  });

  it(`should render projected content`, () => {
    const mockFixture = TestBed.createComponent(MockComponent);
    const projectedContent = mockFixture.debugElement.query(
      By.css('.projected-content')
    );

    expect(projectedContent).not.toBeNull();
  });
});
