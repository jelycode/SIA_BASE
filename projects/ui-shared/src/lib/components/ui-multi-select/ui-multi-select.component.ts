import { Component, input, signal, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-ui-multi-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-multi-select.component.html',
  styleUrl: './ui-multi-select.component.scss'
})
export class UiMultiSelectComponent implements ControlValueAccessor, OnInit {
  private elementRef = inject(ElementRef);
  // Inyectamos NgControl de forma segura para evitar el error del constructor
  public ngControl = inject(NgControl, { self: true, optional: true });

  label = input<string>('');
  placeholder = input<string>('Seleccione...');
  width = input<string>('100%');
  options = input<any[]>([]);
  bindLabel = input<string>('nombre');
  bindValue = input<string>('id');

  value = signal<any[]>([]);
  isOpen = signal(false);
  disabled = signal(false);

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {
    // Vinculamos el valueAccessor manualmente
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  toggleDropdown() {
    if (!this.disabled()) this.isOpen.update(v => !v);
  }

  toggleOption(option: any) {
    const current = this.value();
    const val = option[this.bindValue()];
    const isSelected = current.some(i => i[this.bindValue()] === val);

    let newValue = isSelected 
      ? current.filter(i => i[this.bindValue()] !== val)
      : [...current, option];
    
    this.value.set(newValue);
    this.onChange(newValue.map(i => i[this.bindValue()]));
  }

  isSelected(option: any): boolean {
    return this.value().some(i => i[this.bindValue()] === option[this.bindValue()]);
  }

  removeOption(option: any, event: Event) {
    event.stopPropagation();
    const newValue = this.value().filter(i => i[this.bindValue()] !== option[this.bindValue()]);
    this.value.set(newValue);
    this.onChange(newValue.map(i => i[this.bindValue()]));
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  writeValue(val: any): void {
    if (val && Array.isArray(val)) {
      const selected = this.options().filter(o => val.includes(o[this.bindValue()]));
      this.value.set(selected);
    } else {
      this.value.set([]);
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
}