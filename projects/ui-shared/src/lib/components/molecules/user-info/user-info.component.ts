import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, ChevronDown, Bell, Settings } from 'lucide-angular';

@Component({
  selector: 'lib-user-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  readonly PlusIcon = Plus;
  readonly ChevronIcon = ChevronDown;
  readonly BellIcon = Bell;
  readonly SettingsIcon = Settings;
}