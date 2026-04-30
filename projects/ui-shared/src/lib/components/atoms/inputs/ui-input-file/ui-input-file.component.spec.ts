import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputFileComponent } from './ui-input-file.component';

describe('UiInputFileComponent', () => {
  let component: UiInputFileComponent;
  let fixture: ComponentFixture<UiInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiInputFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiInputFileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show placeholder text when no file is selected', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.querySelector('.ui-input-file-text');
    expect(text?.textContent?.trim()).toBe('Choose file');
  });

  it('should display file name after selection', () => {
    const mockFile = new File(['content'], 'test-document.pdf', { type: 'application/pdf' });
    component.writeValue(mockFile);
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.ui-input-file-text');
    expect(text?.textContent?.trim()).toBe('test-document.pdf');
  });

  it('should clear file when writeValue is called with null', () => {
    const mockFile = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    component.writeValue(mockFile);
    fixture.detectChanges();
    component.writeValue(null);
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('.ui-input-file-text');
    expect(text?.textContent?.trim()).toBe('Choose file');
  });

  it('should disable button when disabled state is set', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.ui-input-file-browse-btn');
    expect(btn?.disabled).toBeTrue();
  });

  it('should call onChange when a file is selected', () => {
    const mockFn = jasmine.createSpy('onChange');
    component.registerOnChange(mockFn);

    const mockFile = new File(['content'], 'report.xlsx', { type: 'application/vnd.ms-excel' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(mockFile);

    const input = fixture.nativeElement.querySelector('.ui-input-file-native') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: dataTransfer.files });
    input.dispatchEvent(new Event('change'));

    expect(mockFn).toHaveBeenCalledWith(mockFile);
  });

  it('should show hint when provided and no error', () => {
    fixture.componentRef.setInput('hint', 'Max file size: 5MB');
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector('.ui-input-file-hint');
    expect(hint?.textContent?.trim()).toBe('Max file size: 5MB');
  });

  it('should show error message when isInvalid is true', () => {
    component.isInvalid.set(true);
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.ui-input-file-error-msg');
    expect(error).toBeTruthy();
  });
});
