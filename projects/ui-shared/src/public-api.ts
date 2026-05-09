/*
 * Public API Surface of ui-shared
 *
 * Capas:
 * - atoms: controles genéricos reutilizables
 * - molecules: bloques combinados (búsqueda superior, usuario, etc.)
 * - navigation: árboles/menús de navegación
 * Layout y shell viven fuera de atoms cuando no son reusables como primitivas.
 */

export * from './lib/components/main-layout/main-layout.component';
export * from './lib/components/atoms';
export * from './lib/components/molecules';
export * from './lib/components/atoms/navigation';



