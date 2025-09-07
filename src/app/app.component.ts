import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appUserManagmentRonny';
  private authService: AuthService;

  constructor(
    private primengConfig: PrimeNGConfig, 
    private translateService: TranslateService, 
    authService: AuthService
  ) {
    this.authService = authService;
  }
  

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.primengConfig.ripple = true;
    this.translate('es');
     const token = localStorage.getItem('token');
    if (token) {
      this.authService.validarToken().subscribe();
    }
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }
}
