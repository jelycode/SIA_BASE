import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiInputDateComponent } from './ui-input-date.component';

describe('UiInputDateComponent', () => {
  let component: UiInputDateComponent;
  let fixture: ComponentFixture<UiInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiInputDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
