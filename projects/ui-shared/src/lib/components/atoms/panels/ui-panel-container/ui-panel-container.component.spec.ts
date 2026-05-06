import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiPanelContainerComponent } from './ui-panel-container.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Creamos un Host Component para probar la proyección de contenido (ng-content)
@Component({
  standalone: true,
  imports: [UiPanelContainerComponent],
  template: `
    <lib-ui-panel-container title="Título de Prueba">
      <div id="test-content">Contenido Proyectado</div>
    </lib-ui-panel-container>
  `
})
class TestHostComponent {}

describe('UiPanelContainerComponent', () => {
  let component: UiPanelContainerComponent;
  let fixture: ComponentFixture<UiPanelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPanelContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UiPanelContainerComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el título correctamente', () => {
    // Seteamos el valor del signal input
    fixture.componentRef.setInput('title', 'Mi Panel de Seguros');
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.ui-panel-title')).nativeElement;
    expect(titleElement.textContent).toContain('Mi Panel de Seguros');
  });

  it('debe aplicar el color de borde personalizado', () => {
    const customBorder = '#ff0000';
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('borderColor', customBorder);
    fixture.detectChanges();

    const container = fixture.debugElement.query(By.css('.ui-panel-container')).nativeElement;
    // Comprobamos que el estilo inline se aplicó
    expect(container.style.borderColor).toBe('rgb(255, 0, 0)'); // El navegador traduce hex a rgb
  });

  it('debe generar el degradado de fondo en el header', () => {
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('titleBgStartColor', '#000000');
    fixture.componentRef.setInput('titleBgEndColor', '#ffffff');
    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('.ui-panel-title-area')).nativeElement;
    expect(header.style.backgroundImage).toContain('linear-gradient(to right, rgb(0, 0, 0), rgb(255, 255, 255))');
  });

  it('debe proyectar el contenido dentro del ng-content', () => {
    // Usamos el HostComponent para verificar la proyección
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const projectedContent = hostFixture.debugElement.query(By.css('#test-content'));
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.nativeElement.textContent).toBe('Contenido Proyectado');
    
    // Verificamos que esté dentro del área de contenido del panel
    const contentArea = hostFixture.debugElement.query(By.css('.ui-panel-content-area'));
    expect(contentArea.nativeElement.contains(projectedContent.nativeElement)).toBeTrue();
  });

  it('no debe renderizar el header si el título no está presente', () => {
    // Aunque es un input.required, probamos el comportamiento del @if
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css('.ui-panel-title-area'));
    expect(header).toBeNull();
  });
});