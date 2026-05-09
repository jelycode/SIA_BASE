import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
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
  ,  UiTooltipComponent 
  , UiHeaderComponent
} from 'ui-shared';

@Component({
  selector: 'app-det-policy',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    UiInputComponent, UiInputDateComponent, UiButtonComponent,
    UiMultiSelectComponent,  UiSelectComponent,
    UiCheckComponent, UiHeaderComponent
    //, UiLabelComponent,UiPanelContainerComponent, UiTooltipComponent
  ],
  templateUrl: './det-policy.html',
  styleUrl: './det-policy.scss'
})
export class DetPolicy {
  // Opciones para los selectores según la imagen
  tiposProducto = signal([{ value: '1', label: 'INDIVIDUAL' },{ value: '2', label: 'COLECTIVO' },{ value: '3', label: 'INTERNACIONAL' },{ value: '4', label: 'CUIDADO TOTAL'}   ]);
  tiposPoliza = signal([{ value: '1', label: 'SALUD' },{ value: '2', label: 'VIDA' },{ value: '3', label: 'CATASTROFICO' }]);
  estadoProducto= signal([{ value: '1', label: 'Vigente' },{ value: '2', label: 'Vencida' },{ value: '3', label: 'En Renovación' }]);
  plazoOptions = signal([{ value: 30, label: '30 DIAS' }]);
  fichaOptions = signal([{ value: 'INDIVECOMM', label: 'INDIVECOMM' }]);
  canalOptions = signal([{ value: '1', label: 'E-Commerce' },{ value: '2', label: 'Presencial' },{ value: '3', label: 'Mediador' }]);
  tiposPrestacion = signal([{ value: '1', label: 'Ambulatorio' },{ value: '2', label: 'Presencial' }]);
  optPrimaParcial = [{ value: 'true', label: '' }];
  optCalculoPrimaPorEdad = [{ value: 'true', label: '' }];  
  optCertificadoAutomatico=[{value:'true',label:''}]

  form = new FormGroup({
    nroPoliza: new FormControl('182216'),
    vigenciaDesde: new FormControl('01/12/2025'),
    vigenciaHasta: new FormControl('30/11/2026'),
    tipo: new FormControl('SALUD'),
    plazoTermino: new FormControl(30),
    diasRetracto: new FormControl(30),
    tipoFicha: new FormControl('INDIVECOMM'),
    nombrePoliza: new FormControl('SEGURO BUPA CUIDADO TOTAL 60'),
    impresionDefinitiva: new FormControl(false),
    codigoProducto: new FormControl('92'),
    diasMaxCobro: new FormControl(180),
    cantDecimales: new FormControl(6),
    rutContratante: new FormControl('99988347'),
    nombreContratante: new FormControl('ALVARO RODRIGO MARTINEZ SOTO')
  });
}