import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiTreeComponent } from './ui-tree.component';
import { LucideAngularModule, ChevronDown, ChevronRight, Building2 } from 'lucide-angular';

describe('UiTreeComponent', () => {
  let component: UiTreeComponent;
  let fixture: ComponentFixture<UiTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importamos el componente y el módulo de iconos necesario
      imports: [
        UiTreeComponent, 
        LucideAngularModule.pick({ ChevronDown, ChevronRight, Building2 })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiTreeComponent);
    component = fixture.componentInstance;
    
    // Inicializamos datos mínimos para evitar errores de renderizado
    component.nodes = []; 
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});