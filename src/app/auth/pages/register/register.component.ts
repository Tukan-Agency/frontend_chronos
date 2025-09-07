import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  items: MenuItem[];

  constructor() {
    this.items = [{
      label: 'Datos Personales',
      routerLink: 'personalData'
    },
    {
      label: 'Contacto',
      routerLink: 'contact'
    },
    {
      label: 'País',
      routerLink: 'country'
    },
    {
      label: 'Contraseña',
      routerLink: 'password'
    },
    ];
  }

}
