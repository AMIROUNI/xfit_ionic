import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecepiesPage } from './recepies.page';

describe('RecepiesPage', () => {
  let component: RecepiesPage;
  let fixture: ComponentFixture<RecepiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
