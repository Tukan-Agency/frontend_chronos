import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import {Cliente} from "../../dashboard/interfaces/clients";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario!: Usuario;
  private baseUrl: string = environment.baseUrl;
  private newUser: Usuario;
  private role: number = 0;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {
    const date = new Date();
    this.newUser = {
      name: '',
      surname: '',
      birthday: date,
      email: '',
      address: '',
      company: '',
      contactNumber: 0,
      country: {
        name: '',
        code: '',
        flag: ''
      },
      currency: '',
      role: 2,
      sequenceId: 0,
    }
  }

  getRole() {
    return this.role;
  }

  setNewUser(typeData: string, data: any) {
    switch (typeData) {
      case 'personalData':
        this.newUser.name = data.name;
        this.newUser.surname = data.surname;
        this.newUser.email = data.email;
        this.newUser.birthday = data.birthday;
        break;
      case 'contact':
        this.newUser.contactNumber = data.contactNumber;
        if (data.checked) {
          this.newUser.whatsapp = data.whatsapp;
        } else {
          this.newUser.whatsapp = data.contactNumber;
        }
        this.newUser.address = data.address;
        this.newUser.company = data.company;
        break;
      case 'country':
        this.newUser.country = {
          name: data.country.translations['spa'].common,
          code: data.country.cca2,
          flag: data.country.flags.png
        };
        this.newUser.currency = data.currency;
        break;
      default:
        break;
    }

  }

  // LOGIN DE USUARIO
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              name: resp.user.name!,
              _id: resp.user._id!,
              email: resp.user.email!,
              surname: resp.user.surname!,
              contactNumber: resp.user.contactNumber!,
              address: resp.user.address!,
              birthday: resp.user.birthday!,
              company: resp.user.company!,
              country: resp.user.country!,
              whatsapp: resp.user.whatsapp!,
              currency: resp.user.currency!,
              role: resp.user.role!,
              sequenceId: resp.user.sequenceId!,
            }

            this.role = this._usuario.role;
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  // REGISTRO DE USUARIO
  registro(password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = {
      name: this.newUser.name,
      surname: this.newUser.surname,
      birthday: this.newUser.birthday,
      email: this.newUser.email,
      address: this.newUser.address,
      company: this.newUser.company,
      country: this.newUser.country,
      contactNumber: this.newUser.contactNumber,
      whatsapp: this.newUser.whatsapp,
      currency: this.newUser.currency,
      password: password,
      role: 2,
    };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  // VALIDAR EMAIL
  validarEmail(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/email`;
    const headers = new HttpHeaders()
      .set('x-email', email || '');

      return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  // VALIDAR TOKEN 

  validarToken(): Observable<boolean> {
  const token = localStorage.getItem('token');
  if (!token) return of(false); // Verificación temprana si no hay token

  const url = `${this.baseUrl}/auth/renew`;
  const headers = new HttpHeaders().set('x-token', token);

  return this.http.get<AuthResponse>(url, { headers }).pipe(
    tap({
      next: (resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            _id: resp.user._id!,
            name: resp.user.name!,
            surname: resp.user.surname!,
            birthday: new Date(resp.user.birthday!),
            email: resp.user.email!,
            address: resp.user.address!,
            company: resp.user.company!,
            contactNumber: resp.user.contactNumber!,
            whatsapp: resp.user.whatsapp!,
            country: {
              name: resp.user.country?.name || '',
              code: resp.user.country?.code || '',
              flag: resp.user.country?.flag || ''
            },
            currency: resp.user.currency!,
            role: resp.user.role!,
            sequenceId: resp.user.sequenceId!
          };
          this.role = this._usuario.role;
        } else {
          this.logout(); // Limpia la sesión si la respuesta no es ok
        }
      },
      error: () => this.logout() // Limpia la sesión si hay error
    }),
    map(resp => resp.ok),
    catchError(() => {
      this.logout();
      return of(false);
    })
  );
}
  changePass(password: string, usuario: string) {
    const url = `${this.baseUrl}/auth/update/password`;
    const body = {
      _id: usuario,
      password: password
    }

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok }) => {
          return ok
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }

  logout() {
    localStorage.clear();
  }
}
