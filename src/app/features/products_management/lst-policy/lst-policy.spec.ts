import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LstPolicy } from './lst-policy';

describe('LstPolicy', () => {
  let component: LstPolicy;
  let fixture: ComponentFixture<LstPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LstPolicy],
    }).compileComponents();

    fixture = TestBed.createComponent(LstPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
