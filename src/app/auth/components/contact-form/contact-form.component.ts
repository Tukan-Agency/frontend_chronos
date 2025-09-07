import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  contactForm: FormGroup = this.fb.group({
    contactNumber: ['', [Validators.required]],
    checked: [false],
    whatsapp: [''],
    address: ['', [Validators.required]],
    company: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  nextStep() {
    this.authService.setNewUser('contact', this.contactForm.value);
    this.router.navigate(['/auth/registro/country']);
  }

  previousStep() {
    this.router.navigate(['/auth/registro/personalData']);
  }

}
