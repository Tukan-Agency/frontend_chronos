import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../../shared/util.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  userName: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) { }

  login() {
    const { email, password } = this.loginForm.value;

    console.log('[Login] Enviando credenciales:', { email, password });

    this.authService.login(email, password).subscribe((ok: any) => {
      console.log('[Login] Respuesta del login:', ok);

      if (ok === true) {
        console.log('[Login] Login exitoso. Redirigiendo al dashboard...');
        this.router.navigateByUrl('/dashboard');
      } else {
        console.warn('[Login] Falló el login. Mensaje:', ok);
        this.messageService.add({
          severity: 'error',
          summary: 'Login incorrecto',
          detail: ok || 'Revisa tus credenciales'
        });
      }
    }, error => {
      console.error('[Login] Error inesperado:', error);
    });
  }
}
