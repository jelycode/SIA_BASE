import { Injectable, signal, computed } from '@angular/core';

export interface AppUser {
  nombre:   string;
  email:    string;
  rol:      string;
  avatar?:  string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  /** Usuario autenticado. Null = no logueado. */
  private readonly _currentUser = signal<AppUser | null>({
    nombre:  'Mario González',
    email:   'mario.gonzalez@empresa.com',
    rol:     'Marketing Manager',
    avatar:  'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png'
  });

  /** Expuesto como readonly para los componentes */
  readonly currentUser  = this._currentUser.asReadonly();
  readonly isLoggedIn   = computed(() => this._currentUser() !== null);

  /**
   * Simula el login. En el futuro reemplaza por una llamada HTTP.
   * Devuelve true si las credenciales son válidas (modo demo).
   */
  login(email: string, password: string): boolean {
    const valid = !!email && password.length >= 4;
    if (valid) {
      this._currentUser.set({
        nombre:  this.extractName(email),
        email,
        rol:     'Administrador',          // ← reemplaza con el rol real del backend
        avatar:  'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png'
      });
    }
    return valid;
  }

  logout(): void {
    this._currentUser.set(null);
  }

  /** Utilidad: extrae un nombre legible del email mientras no hay BD */
  private extractName(email: string): string {
    const local = email.split('@')[0] ?? email;
    return local
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }
}
