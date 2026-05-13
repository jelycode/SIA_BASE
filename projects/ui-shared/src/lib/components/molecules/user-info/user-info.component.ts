import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, ChevronDown, Bell, Settings, User, Shield, LogOut, HelpCircle, Moon } from 'lucide-angular';
import { AuthService } from '../../../../../../../src/app/core/auth/auth.service';

@Component({
  selector: 'lib-user-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);

  /** Datos reactivos del usuario — se actualizan solos al hacer login/logout */
  readonly user = this.auth.currentUser;

  readonly ChevronIcon  = ChevronDown;
  readonly BellIcon     = Bell;
  readonly SettingsIcon = Settings;
  readonly UserIcon     = User;
  readonly ShieldIcon   = Shield;
  readonly LogOutIcon   = LogOut;
  readonly HelpIcon     = HelpCircle;
  readonly MoonIcon     = Moon;

  isOpen   = signal(false);
  darkMode = signal(false);

  toggleMenu(): void { this.isOpen.update(v => !v); }
  closeMenu():  void { this.isOpen.set(false); }

  toggleDarkMode(): void {
    this.darkMode.update(v => !v);
    document.documentElement.classList.toggle('dark', this.darkMode());
  }

  onPerfil():    void { this.closeMenu(); }
  onSeguridad(): void { this.closeMenu(); }

  onSalir(): void {
    this.auth.logout();
    this.closeMenu();
    void this.router.navigateByUrl('/login');
  }

  onAyuda(): void { this.closeMenu(); }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.user-profile-wrapper')) {
      this.closeMenu();
    }
  }
}
