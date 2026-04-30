import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TopSearchComponent } from '../molecules/top-search/top-search.component';
import { UserInfoComponent } from '../molecules/user-info/user-info.component';
import { LucideAngularModule, Search, Settings, Bell, ChevronDown, Plus, Menu, House, FileText, Users } from 'lucide-angular';
import { UiTreeComponent } from '../atoms/navigation/ui-tree/ui-tree.component';

@Component({
  selector: 'lib-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    TopSearchComponent,
    UserInfoComponent,
    UiTreeComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isSidebarOpen = true;

  readonly Bell       = Bell;
  readonly Settings   = Settings;
  readonly MenuIcon   = Menu;
  readonly HomeIcon   = House;
  readonly FileIcon   = FileText;
  readonly UsersIcon  = Users;
  readonly SearchIcon = Search;

  constructor(private router: Router) {}  // ← inyecta Router

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
            { label: 'INDIVIDUAL',    id: 'acme-ind'  },
            { label: 'COLECTIVO',     id: 'acme-col'  },
            { label: 'PYME',          id: 'acme-pyme' },
            { label: 'INTERNACIONAL', id: 'acme-int'  }
          ]
        },
        {
          label: 'CONSORCIO',
          id: 'consorcio-sub',
          children: [
            { label: 'INDIVIDUAL', id: 'acme-ind'  },
            { label: 'PYME',       id: 'acme-pyme' },
          ]
        },
        {
          label: 'SANTANDER CONSUMER',
          id: 'santander-consumer-sub',
          children: [
            { label: 'INDIVIDUAL', id: 'acme-ind'  },
            { label: 'PYME',       id: 'acme-pyme' },
          ]
        }
      ]
    }
  ];

  activeMenuId = 'acme-col';

  cambiarVista(id: string) {
    console.log('Cambiando a la vista del nodo:', id);
    this.activeMenuId = id;

    // Mapeo id del nodo → ruta
    const rutas: Record<string, string> = {
      'acme-col':  '/policies',
      'acme-ind':  '/policies',
      'acme-pyme': '/policies',
      'acme-int':  '/policies',
    };

    const ruta = rutas[id];
    if (ruta) {
      this.router.navigate([ruta]);
    }
  }
}