import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalorieCalculatorPage } from './calorie-calculator.page';

describe('CalorieCalculatorPage', () => {
  let component: CalorieCalculatorPage;
  let fixture: ComponentFixture<CalorieCalculatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
