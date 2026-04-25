import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- AGREGAR ESTO
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // <-- Importar FontAwesomeModule
import { faCoffee, faSearch, faBell, faCog, faPlus, faChevronDown, faHome, faFileText, faUsers, faBars } from '@fortawesome/free-solid-svg-icons'; // <-- Importar iconos específicos
import { library } from '@fortawesome/fontawesome-svg-core'; // <-- Importar la librería de Font Awesome
import { routes } from './app.routes';

// Añadir los iconos que se usarán a la librería global de Font Awesome
library.add(faCoffee, faSearch, faBell, faCog, faPlus, faChevronDown, faHome, faFileText, faUsers, faBars);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FontAwesomeModule)
  ]
};
