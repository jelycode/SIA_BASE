import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSearchComponent } from '../top-search/top-search.component'; // Asegúrate de que la ruta sea correcta
import { UserInfoComponent } from '../user-info/user-info.component';
import { LucideAngularModule, Search, Settings, Bell, ChevronDown, Plus ,    Menu,   House,   FileText,   Users} from 'lucide-angular';
import { UiTreeComponent } from '../ui-tree/ui-tree.component';


import { RouterModule } from '@angular/router'; // <--- 1. IMPORTA ESTO

@Component({
  selector: 'lib-main-layout',
  // 2. AÑADE RouterModule AQUÍ
  imports: [
      CommonModule 
      , RouterModule 
      , LucideAngularModule
      , TopSearchComponent
      , UserInfoComponent
      , UiTreeComponent
    ], 
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSidebarOpen = true; // Estado inicial

  readonly Bell = Bell;
  readonly Settings = Settings;
  readonly MenuIcon = Menu;
  readonly HomeIcon = House;
  readonly FileIcon = FileText;
  readonly UsersIcon = Users;
  readonly SearchIcon = Search;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


menuItems = [
  {
    label: 'BUPA SEGUROS',
    id: 'bupa-root',
    isOpen: true,
    children: [
      {
        label: 'BUPA',
        id: 'bupa-sub',
        children: [
          { label: 'INDIVIDUAL', id: 'acme-ind' },
          { label: 'COLECTIVO', id: 'acme-col' }, // Activo por defecto
          { label: 'PYME', id: 'acme-pyme' },
          { label: 'INTERNACIONAL', id: 'acme-int' }
        ]
      },
      {
        label: 'CONSORCIO',
        id: 'consorcio-sub',
        children: [
          { label: 'INDIVIDUAL', id: 'acme-ind' },
          { label: 'PYME', id: 'acme-pyme' },
        ]
      },
      {
        label: 'SANTANDER CONSUMER',
        id: 'santander-consumer-sub',
        children: [
          { label: 'INDIVIDUAL', id: 'acme-ind' },
          { label: 'PYME', id: 'acme-pyme' },
        ]
      }
    ]
  }
];

activeMenuId = 'acme-col'; // Aquí marcas el que tiene el asterisco * 

cambiarVista(id: string) {
    console.log('Cambiando a la vista del nodo:', id);
    this.activeMenuId = id;
}
}