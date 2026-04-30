import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCheckComponent } from './ui-check.component';

describe('UiCheckComponent', () => {
  let component: UiCheckComponent;
  let fixture: ComponentFixture<UiCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCheckComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCheckComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
