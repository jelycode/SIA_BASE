import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'lib-top-search',
  standalone: true,
  imports: [
    LucideAngularModule  
  ],
  templateUrl: './top-search.component.html',
  styleUrl: './top-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSearchComponent {
    readonly Search = Search;
    placeholder = input<string>('Buscar pólizas, asegurados...');
}