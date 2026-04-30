import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetPolicy } from './det-policy';


describe('DetPolicy', () => {
  let component: DetPolicy;
  let fixture: ComponentFixture<DetPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetPolicy],
    }).compileComponents();

    fixture = TestBed.createComponent(DetPolicy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
