import { Component, ElementRef, ViewChild, input, signal, forwardRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-ui-input-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputFileComponent),
      multi: true
    }
  ],
  templateUrl: './ui-input-file.component.html',
  styleUrl: './ui-input-file.component.scss'
})
export class UiInputFileComponent implements ControlValueAccessor {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Inputs como Signals (misma convención que UiInputComponent)
  label       = input<string>('');
  id          = input<string>(`ui-input-file-${Math.random().toString(36).substring(2, 9)}`);
  placeholder = input<string>('Choose file');
  browseLabel = input<string>('Browse');
  accept      = input<string>('');
  multiple    = input<boolean>(false);
  required    = input<boolean>(false);
  readonly    = input<boolean>(false);
  hint        = input<string>('');
  width       = input<string>('100%');

  // Estado
  private _files: File[] = [];
  disabled   = false;
  isInvalid  = signal(false);
  isDragOver = signal(false);

  /** Texto que se muestra dentro del campo */
  hasFile = computed(() => this._files.length > 0);
  displayText = computed(() => {
    if (this._files.length === 0) return this.placeholder();
    if (this._files.length === 1) return this._files[0].name;
    return `${this._files.length} files selected`;
  });

  onChange: any = () => {};
  onTouched: any = () => {};

  /** Abre el file picker nativo */
  triggerFileInput(): void {
    if (!this.disabled && !this.readonly()) {
      this.fileInput.nativeElement.click();
    }
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this._files = Array.from(input.files);
      const value = this.multiple() ? this._files : this._files[0];
      this.onChange(value);
    }
  }

  /** Drag & Drop */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled) this.isDragOver.set(true);
  }

  onDragLeave(): void {
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    if (this.disabled || this.readonly()) return;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this._files = this.multiple() ? Array.from(files) : [files[0]];
      const value = this.multiple() ? this._files : this._files[0];
      this.onChange(value);
      this.onTouched();
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  getErrorMessage(): string {
    return 'Este campo es requerido';
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(val: File | File[] | null): void {
    if (!val) {
      this._files = [];
      if (this.fileInput?.nativeElement) {
        this.fileInput.nativeElement.value = '';
      }
    } else {
      this._files = Array.isArray(val) ? val : [val];
    }
  }

  registerOnChange(fn: any): void  { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
