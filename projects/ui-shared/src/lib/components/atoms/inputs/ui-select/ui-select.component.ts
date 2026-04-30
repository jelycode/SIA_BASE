import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  group?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

/** Acepta `{ value, label }` o `{ id, nombre }` como en ui-multi-select */
export type RawSelectOption =
  | SelectOption
  | { id: string | number; nombre: string; group?: string };

@Component({
  selector: 'lib-ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-select.component.html',
  styleUrls: ['./ui-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true,
    },
  ],
})
export class UiSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: RawSelectOption[] = [];
  @Input() placeholder = 'Seleccione...';
  @Input() disabled = false;
  label = input<string>('');
  width = input<string>('100%');

  @Output() selectionChange = new EventEmitter<SelectOption | null>();

  isOpen = false;
  selected: SelectOption | null = null;
  groups: SelectGroup[] = [];
  normalizedOptions: SelectOption[] = [];

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.normalizeAndBuildGroups();
    this.syncSelectedFromValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.normalizeAndBuildGroups();
      this.syncSelectedFromValue();
    }
  }

  private normalizeOption(raw: RawSelectOption): SelectOption {
    if ('id' in raw && 'nombre' in raw) {
      return { value: raw.id, label: raw.nombre, group: raw.group };
    }
    return raw as SelectOption;
  }

  private normalizeAndBuildGroups(): void {
    this.normalizedOptions = this.options.map((o) => this.normalizeOption(o));
    this.buildGroups();
  }

  private buildGroups(): void {
    const groupMap = new Map<string, SelectOption[]>();
    const ungrouped: SelectOption[] = [];

    for (const opt of this.normalizedOptions) {
      if (opt.group) {
        if (!groupMap.has(opt.group)) {
          groupMap.set(opt.group, []);
        }
        groupMap.get(opt.group)!.push(opt);
      } else {
        ungrouped.push(opt);
      }
    }

    this.groups = [];
    if (ungrouped.length) {
      this.groups.push({ label: '', options: ungrouped });
    }
    groupMap.forEach((opts, lbl) => {
      this.groups.push({ label: lbl, options: opts });
    });
  }

  /** Valor actual del CVA (sincronizado con `selected`) */
  private currentValue: string | number | null = null;

  private syncSelectedFromValue(): void {
    if (this.currentValue === null || this.currentValue === undefined || this.currentValue === '') {
      this.selected = null;
      return;
    }
    this.selected =
      this.normalizedOptions.find((o) => o.value === this.currentValue) ?? null;
  }

  toggleDropdown(): void {
    if (this.disabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onTouched();
    }
  }

  displayText(): string {
    if (this.selected) {
      return this.selected.label;
    }
    return this.placeholder;
  }

  isSelected(option: SelectOption): boolean {
    return this.selected?.value === option.value;
  }

  pickOption(option: SelectOption, event: MouseEvent): void {
    event.stopPropagation();
    this.selected = option;
    this.currentValue = option.value;
    this.onChange(option.value);
    this.selectionChange.emit(option);
    this.isOpen = false;
  }

  clearSelection(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.selected = null;
    this.currentValue = null;
    this.onChange(null);
    this.selectionChange.emit(null);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  writeValue(val: string | number | null): void {
    this.currentValue = val ?? null;
    this.syncSelectedFromValue();
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
