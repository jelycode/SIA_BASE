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
  UiInputFileComponent,
  UiPanelContainerComponent  
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
    UiInputFileComponent,
    UiPanelContainerComponent
  ],
  templateUrl: './det-policy.html',
  styleUrl: './det-policy.scss'
})
export class DetPolicy {
  readonly SearchIcon = 'fa fa-search';
  readonly SaveIcon   = 'fa fa-save';

  policyForm = new FormGroup({
    txtPoliza:           new FormControl('20454', [Validators.required]),
    txtNombre:           new FormControl('Bupa Administración y servicios'),
    txtFechaInicio:      new FormControl('01/01/2026'),
    txtFechaFin:         new FormControl('31/12/2027'),
    tipoCoberturas:      new FormControl<string[]>([]),
    tipoCoberturaUnica:  new FormControl<string | number | null>(null),
    txtTipoProducto:     new FormControl('Colectivo'),
    renovacionAutomatica: new FormControl<string>('no'),
    metodoPago:          new FormControl<string>('credito'),
    canalesNotificacion: new FormControl<string[]>(['email']),
    documentosIncluidos: new FormControl<string[]>([]),
    /** Archivo adjunto de la póliza */
    archivoPoliza:       new FormControl<File | null>(null),
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
    { value: 'sms',   label: 'SMS' },
    { value: 'app',   label: 'App móvil' },
  ];

  readonly opcionesDocumentos: CheckboxOption[] = [
    { value: 'poliza',      label: 'Copia póliza' },
    { value: 'condiciones', label: 'Condiciones generales', indeterminate: true },
    { value: 'anexos',      label: 'Anexos' },
  ];

  onCoberturaChange(selected: MultiSelectOption[]): void {
    console.log('Coberturas seleccionadas:', selected);
  }

  onTipoCoberturaChange(selected: SelectOption | null): void {
    console.log('Cobertura seleccionada (select):', selected);
  }
}
