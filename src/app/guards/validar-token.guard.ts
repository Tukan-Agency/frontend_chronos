import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

canActivate(): Observable<boolean> {
  return this.authService.validarToken().pipe(
    tap(valid => {
      if (!valid) {
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
      }
    }),
    catchError(err => {
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
      return of(false);
    })
  );
}


  canLoad(): Observable<boolean> | boolean {
    return this.checkToken();
  }

 private checkToken(): Observable<boolean> {
  return this.authService.validarToken().pipe(
    tap(valid => {
      console.log('[Guard] Resultado de validarToken:', valid);
      if (!valid) {
        console.warn('[Guard] Token inválido. Redirigiendo...');
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
      }
    }),
    catchError(err => {
      console.error('[Guard] Error al validar token:', err);
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
      return of(false);
    })
  );
}

}
