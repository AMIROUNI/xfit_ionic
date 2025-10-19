import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipiesDetailsPage } from './recipies-details.page';

describe('RecipiesDetailsPage', () => {
  let component: RecipiesDetailsPage;
  let fixture: ComponentFixture<RecipiesDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipiesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
