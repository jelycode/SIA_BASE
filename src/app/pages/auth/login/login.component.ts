import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { UiButtonComponent, UiInputComponent } from 'ui-shared';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, UiInputComponent, UiButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly errorMsg = signal<string | null>(null);
  readonly loading = signal(false);

  readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  submit(): void {
    this.errorMsg.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const email = this.form.controls.email.value ?? '';
    const password = this.form.controls.password.value ?? '';
    this.loading.set(true);
    const ok = this.auth.login(email, password);
    this.loading.set(false);
    if (ok) {
      void this.router.navigateByUrl('/dashboard');
    } else {
      this.errorMsg.set('No se pudo iniciar sesión. Verifica los datos.');
    }
  }
}
