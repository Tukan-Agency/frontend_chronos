import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})
export class PersonalDataFormComponent {
  correoValido: boolean =  false;
  disabledButton: boolean = true;

  personalDataForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthday: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private messageService: MessageService, private router: Router) { }

  nextStep() {
    this.authService.setNewUser('personalData', this.personalDataForm.value);
    this.router.navigate(['/auth/registro/contact']);
  }

  verificarCorreo() {
    this.authService.validarEmail(this.personalDataForm.value.email).subscribe((ok: boolean) => {
      this.messageService.clear();
      if (ok) {
        this.correoValido = true;
        this.messageService.add({severity:'success', summary: 'Ok', detail: 'Correo valido'});
      } else {
        this.correoValido = false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Correo ya registrado'});
      }
      this.verificarEstado();
    });
  }

  verificarEstado() {
    if (this.personalDataForm.valid && this.correoValido) {
      this.disabledButton = false;
      return;
    }
    this.disabledButton = true;
  }

  changeState() {
    this.correoValido = false;
    this.verificarEstado();
  }

}
