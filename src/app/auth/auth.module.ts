import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PrimeModule } from '../prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { PersonalDataFormComponent } from './components/datos-personales-form/personal-data-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    PersonalDataFormComponent,
    ContactFormComponent,
    CountryFormComponent,
    PasswordFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService]
})
export class AuthModule { }
