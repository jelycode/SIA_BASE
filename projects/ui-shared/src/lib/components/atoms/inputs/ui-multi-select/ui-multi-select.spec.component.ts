import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMultiSelectComponent } from './ui-multi-select.component';

describe('UiMultiSelectComponent', () => {
  let component: UiMultiSelectComponent;
  let fixture: ComponentFixture<UiMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMultiSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMultiSelectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
