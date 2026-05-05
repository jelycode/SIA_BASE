import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function toISODateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Acepta `yyyy-MM-dd`, `dd/MM/yyyy` o `Date` */
function parseIncomingValue(raw: unknown): Date | null {
  if (raw == null || raw === '') return null;
  if (raw instanceof Date) {
    return isNaN(raw.getTime()) ? null : new Date(raw.getFullYear(), raw.getMonth(), raw.getDate());
  }
  const s = String(raw).trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (iso) {
    const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    return isNaN(d.getTime()) ? null : d;
  }
  const dm = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (dm) {
    const d = new Date(Number(dm[3]), Number(dm[2]) - 1, Number(dm[1]));
    return isNaN(d.getTime()) ? null : d;
  }
  const dmy = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(s);
  if (dmy) {
    const d = new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function formatDdMmYyyy(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const m   = String(d.getMonth() + 1).padStart(2, '0');
  const y   = d.getFullYear();
  return `${day}/${m}/${y}`;
}

export interface UiInputDateCalendarCell {
  date: Date;
  inCurrentMonth: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'lib-ui-input-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-input-date.component.html',
  styleUrls: ['./ui-input-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputDateComponent),
      multi: true,
    },
  ],
})
export class UiInputDateComponent implements ControlValueAccessor {
  label         = input<string>('');
  /** 'top' | 'left' — solo aplica cuando label tiene valor */
  labelPosition = input<'top' | 'left'>('top');
  placeholder   = input<string>('dd/mm/aaaa');
  width         = input<string>('100%');
  id            = input<string>(`ui-input-date-${Math.random().toString(36).slice(2, 9)}`);
  disabled      = input(false);
  allowManualInput = input(true);

  readonly selectedDate = signal<Date | null>(null);
  readonly textDraft    = signal<string>('');
  readonly viewMonth    = signal<Date>(startOfMonth(new Date()));
  readonly pickerOpen   = signal(false);

  readonly monthTitle = computed(() => {
    const v = this.viewMonth();
    return v.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  });

  readonly calendarWeeks = computed(() => {
    const view  = startOfMonth(this.viewMonth());
    const year  = view.getFullYear();
    const month = view.getMonth();
    const sel   = this.selectedDate();

    const first       = new Date(year, month, 1);
    const startOffset = first.getDay();
    const gridStart   = new Date(year, month, 1 - startOffset);

    const weeks: UiInputDateCalendarCell[][] = [];
    let cursor = new Date(gridStart);

    for (let w = 0; w < 6; w++) {
      const row: UiInputDateCalendarCell[] = [];
      for (let d = 0; d < 7; d++) {
        const cellDate       = new Date(cursor);
        const inCurrentMonth = cellDate.getMonth() === month;
        const isSelected     = !!(sel && isSameDay(cellDate, sel));
        row.push({ date: cellDate, inCurrentMonth, isSelected });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(row);
    }
    return weeks;
  });

  private onChange: (value: string | null) => void = () => {};
  private onTouched: () => void = () => {};
  private cvaDisabled = false;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  isDisabled(): boolean {
    return this.disabled() || this.cvaDisabled;
  }

  syncDraftFromSelected(): void {
    const d = this.selectedDate();
    this.textDraft.set(d ? formatDdMmYyyy(d) : '');
  }

  onInputClick(event: Event): void {
    if (!this.allowManualInput()) this.togglePicker(event);
  }

  onTextInput(event: Event): void {
    if (!this.allowManualInput() || this.isDisabled()) return;
    this.textDraft.set((event.target as HTMLInputElement).value);
  }

  commitTextInput(): void {
    if (!this.allowManualInput() || this.isDisabled()) return;
    const raw = this.textDraft().trim();
    if (raw === '') {
      this.selectedDate.set(null);
      this.onChange(null);
      this.syncDraftFromSelected();
      this.onTouched();
      return;
    }
    const d = parseIncomingValue(raw);
    if (d) {
      this.selectedDate.set(d);
      this.onChange(toISODateString(d));
      this.syncDraftFromSelected();
      this.onTouched();
    } else {
      this.syncDraftFromSelected();
      this.onTouched();
    }
  }

  onEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.commitTextInput();
      (event.target as HTMLInputElement).blur();
    }
  }

  togglePicker(event?: Event): void {
    event?.stopPropagation();
    if (this.isDisabled()) return;
    const next = !this.pickerOpen();
    this.pickerOpen.set(next);
    if (next) {
      const sel = this.selectedDate();
      this.viewMonth.set(sel ? startOfMonth(sel) : startOfMonth(new Date()));
    }
  }

  closePicker(): void { this.pickerOpen.set(false); }

  prevMonth(event: Event): void {
    event.stopPropagation();
    const v = this.viewMonth();
    this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() - 1, 1));
  }

  nextMonth(event: Event): void {
    event.stopPropagation();
    const v = this.viewMonth();
    this.viewMonth.set(new Date(v.getFullYear(), v.getMonth() + 1, 1));
  }

  selectDay(cell: UiInputDateCalendarCell, event: Event): void {
    event.stopPropagation();
    if (this.isDisabled()) return;
    const d = new Date(cell.date.getFullYear(), cell.date.getMonth(), cell.date.getDate());
    this.selectedDate.set(d);
    this.syncDraftFromSelected();
    this.onChange(toISODateString(d));
    this.onTouched();
    this.pickerOpen.set(false);
  }

  clear(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled()) return;
    this.selectedDate.set(null);
    this.syncDraftFromSelected();
    this.onChange(null);
    this.onTouched();
    this.pickerOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.pickerOpen()) return;
    if (!this.elRef.nativeElement.contains(event.target as Node)) this.closePicker();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.pickerOpen()) this.closePicker();
  }

  writeValue(val: unknown): void {
    this.selectedDate.set(parseIncomingValue(val));
    this.syncDraftFromSelected();
  }

  registerOnChange(fn: (value: string | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.cvaDisabled = isDisabled; }

  weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}
