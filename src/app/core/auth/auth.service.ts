import { Injectable } from '@angular/core';

const STORAGE_KEY = 'sia_auth_session';

export interface AuthSession {
  email: string;
  at: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string): boolean {
    const e = email.trim();
    if (!e || !password) {
      return false;
    }
    const session: AuthSession = { email: e, at: Date.now() };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return true;
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(STORAGE_KEY) !== null;
  }

  getSession(): AuthSession | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  }
}
