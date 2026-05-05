import {
  Component, Input, Output, EventEmitter,
  forwardRef, HostListener, ElementRef, OnInit, OnChanges, SimpleChanges,
  input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MultiSelectOption {
  value: string | number;
  label: string;
  group?: string;
}

export interface MultiSelectGroup {
  label: string;
  options: MultiSelectOption[];
}

export type RawOption =
  | MultiSelectOption
  | { id: string | number; nombre: string; group?: string };

@Component({
  selector: 'lib-ui-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ui-multi-select.component.html',
  styleUrls: ['./ui-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiMultiSelectComponent),
      multi: true
    }
  ]
})
export class UiMultiSelectComponent implements ControlValueAccessor, OnInit, OnChanges {

  @Input() options: RawOption[] = [];
  @Input() placeholder = 'Seleccione...';
  @Input() disabled = false;

  label         = input<string>('');
  /** 'top' | 'left' — solo aplica cuando label tiene valor */
  labelPosition = input<'top' | 'left'>('top');
  width         = input<string>('100%');

  @Output() selectionChange = new EventEmitter<MultiSelectOption[]>();

  isOpen = false;
  selectedItems: MultiSelectOption[] = [];
  groups: MultiSelectGroup[] = [];
  normalizedOptions: MultiSelectOption[] = [];

  private onChange: (value: any[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void { this.normalizeAndBuildGroups(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) this.normalizeAndBuildGroups();
  }

  private normalizeOption(raw: RawOption): MultiSelectOption {
    if ('id' in raw && 'nombre' in raw) {
      return { value: raw.id, label: raw.nombre, group: raw.group };
    }
    return raw as MultiSelectOption;
  }

  private normalizeAndBuildGroups(): void {
    this.normalizedOptions = this.options.map(o => this.normalizeOption(o));
    this.buildGroups();
  }

  buildGroups(): void {
    const groupMap = new Map<string, MultiSelectOption[]>();
    const ungrouped: MultiSelectOption[] = [];

    for (const opt of this.normalizedOptions) {
      if (opt.group) {
        if (!groupMap.has(opt.group)) groupMap.set(opt.group, []);
        groupMap.get(opt.group)!.push(opt);
      } else {
        ungrouped.push(opt);
      }
    }

    this.groups = [];
    if (ungrouped.length) this.groups.push({ label: '', options: ungrouped });
    groupMap.forEach((opts, lbl) => this.groups.push({ label: lbl, options: opts }));
  }

  toggleDropdown(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.onTouched();
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.selectedItems.some(s => s.value === option.value);
  }

  toggleOption(option: MultiSelectOption, event: MouseEvent): void {
    event.stopPropagation();
    const exists = this.selectedItems.some(s => s.value === option.value);
    this.selectedItems = exists
      ? this.selectedItems.filter(s => s.value !== option.value)
      : [...this.selectedItems, option];
    this.onChange(this.selectedItems.map(s => s.value));
    this.selectionChange.emit(this.selectedItems);
  }

  removeItem(item: MultiSelectOption, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedItems = this.selectedItems.filter(s => s.value !== item.value);
    this.onChange(this.selectedItems.map(s => s.value));
    this.selectionChange.emit(this.selectedItems);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) this.isOpen = false;
  }

  writeValue(values: any[]): void {
    if (!values?.length) { this.selectedItems = []; return; }
    this.selectedItems = this.normalizedOptions.filter(o => values.includes(o.value));
  }
  registerOnChange(fn: any): void  { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
