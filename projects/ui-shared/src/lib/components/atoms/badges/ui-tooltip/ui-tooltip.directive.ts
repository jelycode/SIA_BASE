import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  ViewContainerRef,
  ComponentRef,
  inject,
  OnDestroy,
  EventEmitter,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiTooltipComponent } from './ui-tooltip.component';

@Directive({
  selector: '[uiTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(focusin)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focusout)': 'onMouseLeave()',
  },
})
export class UiTooltipDirective implements OnDestroy {
  @Input('uiTooltip') tooltipText: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipDelay: number = 200; // ms
  @Output() tooltipShown = new EventEmitter<void>();
  @Output() tooltipHidden = new EventEmitter<void>();

  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);

  private tooltipRef: ComponentRef<UiTooltipComponent> | null = null;
  private showTimeout: any;
  
  onMouseEnter() {
    this.showTimeout = setTimeout(() => this.showTooltip(), this.tooltipDelay);
  }
  
  onMouseLeave() {
    clearTimeout(this.showTimeout);
    this.hideTooltip();
  }

  private showTooltip() {
    // No mostrar nada si el texto está vacío
    if (!this.tooltipText || this.tooltipText.trim() === '') return;

    if (!this.tooltipRef) {
      this.tooltipRef = this.viewContainerRef.createComponent(UiTooltipComponent);
      this.tooltipRef.setInput('text', this.tooltipText);
      this.tooltipRef.setInput('position', this.tooltipPosition);

      // Adjuntar el tooltip al body para que no se vea afectado por overflow de padres
      document.body.appendChild(this.tooltipRef.location.nativeElement);

      // Use requestAnimationFrame to ensure the tooltip has rendered and has correct dimensions
      // before calculating its position.
      requestAnimationFrame(() => {
        this.positionTooltip();
        // Add 'visible' class after positioning for the fade-in transition
        setTimeout(() => {
          if (this.tooltipRef) {
            this.tooltipRef.location.nativeElement.querySelector('.ui-tooltip-content')?.classList.add('visible');
            this.tooltipShown.emit();
          }
        }, 0);
      });
    }
  }

  private hideTooltip() {
    if (this.tooltipRef) {
      this.tooltipRef.location.nativeElement.querySelector('.ui-tooltip-content')?.classList.remove('visible');
      setTimeout(() => {
        if (this.tooltipRef) {
          this.tooltipRef.destroy();
          this.tooltipRef = null;
        }
      }, 200); // Esperar a que termine la transición de opacidad
    }
  }

  private positionTooltip() {
    if (!this.tooltipRef) return;

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipElement = this.tooltipRef.location.nativeElement;
    const contentElement = tooltipElement.querySelector('.ui-tooltip-content') as HTMLElement;
    
    if (!contentElement) return;

    const tooltipRect = contentElement.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;
    const gap = 8; // Margen entre el elemento y el tooltip
    let currentPos = this.tooltipPosition;

    // 1. Cálculo de posición inicial
    switch (currentPos) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + 10;// (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + 10;// (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left +10; //- tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top - tooltipRect.height - gap;
        left = (hostRect.right)-(tooltipRect.width);//+ tooltipRect.width+ gap)-hostRect.left;
        break;
    }

    // 2. Lógica de "Flip" (Volteo) si no hay espacio
     if (currentPos === 'top' && top < 0) {
      top = hostRect.bottom + gap;
      currentPos = 'bottom';
    } else if (currentPos === 'bottom' && top + tooltipRect.height > window.innerHeight) {
      top = hostRect.top - tooltipRect.height - gap;
      currentPos = 'top';
    } else if (currentPos === 'left' && left < 0) {
      left = hostRect.right + gap;
      currentPos = 'right';
    } else if (currentPos === 'right' && left + tooltipRect.width > window.innerWidth) {
      left = hostRect.left - tooltipRect.width - gap;
      currentPos = 'left';
    }
 
    // 3. Actualizar la flecha en el componente si la posición cambió
    //if (currentPos !== this.tooltipPosition) {
      this.tooltipRef.setInput('position', 'top');//currentPos'');
    //}

    // 4. Ajustes finales para no salirse de los bordes laterales/verticales (ajuste fino)
    const padding = 4;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > window.innerHeight - padding) {
      top = window.innerHeight - tooltipRect.height - padding;
    } 

    // 5. Aplicar estilos al host del tooltip
    tooltipElement.style.top = `${top + scrollY}px`;
    tooltipElement.style.left = `${left + scrollX}px`;
  }

  ngOnDestroy(): void {
    this.hideTooltip();
  }
}