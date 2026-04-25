import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa tu layout (ajusta la ruta según tu estructura, probablemente sea esta)
import { MainLayoutComponent } from '../../projects/ui-shared/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  MainLayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'frontend';
}