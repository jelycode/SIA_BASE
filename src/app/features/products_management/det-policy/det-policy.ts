import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  UiInputComponent,
  UiInputDateComponent,
  UiButtonComponent,
  UiMultiSelectComponent,
  UiLabelComponent,
  MultiSelectOption,
  UiSelectComponent,
  SelectOption,
  UiRadioComponent,
  RadioOption,
  UiCheckComponent,
  CheckboxOption,
} from 'ui-shared';

@Component({
  selector: 'app-det-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UiInputComponent,
    UiInputDateComponent,
    UiButtonComponent,
    UiMultiSelectComponent,
    UiLabelComponent,
    UiSelectComponent,
    UiRadioComponent,
    UiCheckComponent,
  ],
  templateUrl: './det-policy.html',
  styleUrl: './det-policy.scss'
})
export class DetPolicy {
  readonly SearchIcon = 'fa fa-search';
  readonly SaveIcon = 'fa fa-save';

  policyForm = new FormGroup({
    txtPoliza: new FormControl('20454', [Validators.required]), 
    txtNombre: new FormControl('Bupa Administración y servicios'),    
    txtFechaInicio: new FormControl('01/01/2026'),    
    txtFechaFin: new FormControl('31/12/2027'),
    tipoCoberturas: new FormControl<string[]>([]),
    /** Una sola cobertura (lib-ui-select); no reutilizar el mismo control que el multi */
    tipoCoberturaUnica: new FormControl<string | number | null>(null),
    txtTipoProducto: new FormControl('Colectivo'),
    /** Ejemplo radio en línea */
    renovacionAutomatica: new FormControl<string>('no'),
    /** Ejemplo radio vertical (estilo «forma de pago») */
    metodoPago: new FormControl<string>('credito'),
    /** Checkboxes en línea (notificaciones) */
    canalesNotificacion: new FormControl<string[]>(['email']),
    /** Checkboxes en columna + ejemplo indeterminado */
    documentosIncluidos: new FormControl<string[]>([]),
  });

  tipoCoberturas = [
    { id: '1', nombre: 'Vida' },
    { id: '2', nombre: 'Salud' },
    { id: '3', nombre: 'Catastrofico' }
  ];

  readonly opcionesRenovacion: RadioOption[] = [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' },
  ];

  readonly opcionesMetodoPago: RadioOption[] = [
    { value: 'credito', label: 'Tarjeta crédito' },
    { value: 'debito', label: 'Tarjeta débito' },
    { value: 'paypal', label: 'Paypal' },
  ];

  readonly opcionesNotificacion: CheckboxOption[] = [
    { value: 'email', label: 'Correo electrónico' },
    { value: 'sms', label: 'SMS' },
    { value: 'app', label: 'App móvil' },
  ];

  readonly opcionesDocumentos: CheckboxOption[] = [
    { value: 'poliza', label: 'Copia póliza' },
    { value: 'condiciones', label: 'Condiciones generales', indeterminate: true },
    { value: 'anexos', label: 'Anexos' },
  ];

  onCoberturaChange(selected: MultiSelectOption[]): void {
    console.log('Coberturas seleccionadas:', selected);
  }

  onTipoCoberturaChange(selected: SelectOption | null): void {
    console.log('Cobertura seleccionada (select):', selected);
  }

}
