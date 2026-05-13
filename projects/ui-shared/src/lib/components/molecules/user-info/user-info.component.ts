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

  /** Datos reactivos del usuario */
  readonly user = this.auth.currentUser;

  readonly ChevronIcon  = ChevronDown;
  readonly BellIcon     = Bell;
  readonly SettingsIcon = Settings;
  readonly UserIcon     = User;
  readonly ShieldIcon   = Shield;
  readonly LogOutIcon   = LogOut;
  readonly HelpIcon     = HelpCircle;
  readonly MoonIcon     = Moon;

  isOpen      = signal(false);
  isNotifOpen = signal(false);
  darkMode    = signal(false);

  /** Variable con los últimos 3 mensajes */
  messages = signal([
    { id: 1, title: 'Nueva Póliza', desc: 'Se ha asignado la póliza #20454', time: '5 min' },
    { id: 2, title: 'Documento aprobado', desc: 'El contrato Bupa fue validado', time: '2 horas' },
    { id: 3, title: 'Recordatorio', desc: 'Renovación de póliza pendiente para mañana', time: '1 día' }
  ]);

  toggleMenu(): void {
    this.isOpen.update(v => !v);
    if (this.isOpen()) this.isNotifOpen.set(false);
  }

  toggleNotif(): void {
    this.isNotifOpen.update(v => !v);
    if (this.isNotifOpen()) this.isOpen.set(false);
  }

  closeAll(): void {
    this.isOpen.set(false);
    this.isNotifOpen.set(false);
  }

  toggleDarkMode(): void {
    this.darkMode.update(v => !v);
    document.documentElement.classList.toggle('dark', this.darkMode());
  }

  onPerfil():    void { this.closeAll(); }
  onSeguridad(): void { this.closeAll(); }

  onSalir(): void {
    this.auth.logout();
    this.closeAll();
    void this.router.navigateByUrl('/login');
  }

  onAyuda(): void { this.closeAll(); }

  @HostListener('document:click')
  clickOut(): void {
    this.closeAll();
  }
}