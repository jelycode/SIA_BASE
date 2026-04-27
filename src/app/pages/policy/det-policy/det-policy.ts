import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UiInputComponent } from '../../../../../projects/ui-shared/src/lib/components/ui-input/ui-input.component';
import { UiButtonComponent} from '../../../../../projects/ui-shared/src/lib/components/ui-button/ui-button.component';
import { UiMultiSelectComponent } from '../../../../../projects/ui-shared/src/lib/components/ui-multi-select/ui-multi-select.component'; 
import { UiLabelComponent } from '../../../../../projects/ui-shared/src/lib/components/ui-label/ui-label.component'; 
import { MultiSelectOption } from '../../../../../projects/ui-shared/src/lib/components/ui-multi-select/ui-multi-select.component'; 

@Component({
  selector: 'app-det-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UiInputComponent,
    UiButtonComponent,
    UiMultiSelectComponent,
    UiLabelComponent
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
    txtTipoProducto: new FormControl('Colectivo')
  });

  tipoCoberturas = [
    { id: '1', nombre: 'Vida' },
    { id: '2', nombre: 'Salud' },
    { id: '3', nombre: 'Catastrofico' }
  ];

  onCoberturaChange(selected: MultiSelectOption[]): void {
    console.log('Coberturas seleccionadas:', selected);
  }
}