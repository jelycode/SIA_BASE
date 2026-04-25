import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMultiSelect } from './ui-multi-select.component';

describe('UiMultiSelect', () => {
  let component: UiMultiSelect;
  let fixture: ComponentFixture<UiMultiSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMultiSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMultiSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
