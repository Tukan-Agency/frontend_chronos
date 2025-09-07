import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent {
  passwordMatchText: boolean = false;

  passwordForm: FormGroup = this.fb.group({
    password: ['',  Validators.compose([Validators.minLength(8), Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])],
    passwordConfirm: ['', Validators.compose([Validators.minLength(8), Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private router: Router, private messageService: MessageService) { }

  passworMatch() {
    if(this.passwordForm.valid) {
      if (this.passwordForm.value.password === this.passwordForm.value.passwordConfirm) {
        this.passwordMatchText = true;
      } else {
        this.passwordMatchText = false;
        this.messageService.clear();
        this.messageService.add({severity:'error', summary:'Error', detail:'Las contraseñas no coinciden'});
      }
    };
  }

  async nextStep() {
    this.authService.registro(this.passwordForm.value.password).subscribe((ok: any) => {
      if (ok === true) {
        this.router.navigate(['/auth/login']);
      } else {
        console.log('');
      }
    });
  }

  previousStep() {
    this.router.navigate(['/auth/registro/country']);
  }
}
