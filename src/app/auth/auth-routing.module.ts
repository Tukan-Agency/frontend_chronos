import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PersonalDataFormComponent } from './components/datos-personales-form/personal-data-form.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'registro',
        component: RegisterComponent,
        children: [
          { path: 'personalData', component: PersonalDataFormComponent },
          { path: 'contact', component: ContactFormComponent },
          { path: 'country', component: CountryFormComponent },
          { path: 'password', component: PasswordFormComponent }
        ]
      },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
