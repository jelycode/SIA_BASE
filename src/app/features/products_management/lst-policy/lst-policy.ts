import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FileText, Search } from 'lucide-angular';
import { UiButtonComponent, UiInputComponent } from 'ui-shared';



@Component({
  selector: 'app-lst-policy',
  standalone: true,
  imports: [
    CommonModule 
    , ReactiveFormsModule // <--- No olvides este
    , UiInputComponent     // <--- Ni este
    , UiButtonComponent
  ],
  templateUrl: './lst-policy.html',
  styleUrl: './lst-policy.scss'
})

export class LstPolicy {
 
  readonly PolicyIcon = FileText;
  readonly SearchIcon = Search;

    policyForm = new FormGroup({
    txtPoliza: new FormControl('', [Validators.required]),
    txtNombre: new FormControl(''),    
  });
  
  buscar() {
    console.log('Buscando póliza:', this.policyForm.value);
  }

datosPolizas: any[] = [];
ngOnInit() {
    // LLENA EL ARRAY AQUÍ
    this.datosPolizas = [
      { poliza: '20454', nombre: 'Bupa Seguros', fechaInicio: new Date(), fechaFin: new Date(), estado: 'Vigente' },
      { poliza: '20455', nombre: 'Improtadora los Arbolitos', fechaInicio: new Date(), fechaFin: new Date(), estado: 'NO Vigente' },
      { poliza: '20456', nombre: 'Sociedad los remeros', fechaInicio: new Date(), fechaFin: new Date(), estado: 'Pendiente' },
      { poliza: '20457', nombre: 'Panaderia las marraquetas', fechaInicio: new Date(), fechaFin: new Date(), estado: 'Vigente' },
      { poliza: '20458', nombre: 'Constructora salfa', fechaInicio: new Date(), fechaFin: new Date(), estado: 'Vigente' },
    ];
}
// Definimos las columnas para que sea dinámico
  columns = [
    { key: 'poliza', label: 'Póliza' },
    { key: 'nombre', label: 'Nombre póliza' },
    { key: 'fechaInicio', label: 'Fecha Inicio' },
    { key: 'fechaFin', label: 'Fecha Fin' },
    { key: 'estado', label: 'Estado' }
  ];

  // Helper para estilos de estado
  getEstadoClass(estado: string): string {
    const status = estado.toLowerCase();
    if (status === 'activo' || status === 'vigente') return 'status-active';
    if (status === 'pendiente') return 'status-pending';
    return 'status-inactive';
  }

}
