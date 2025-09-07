import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { Observable, map } from 'rxjs';
import { Clientes, Cliente, Currency } from '../interfaces/clients';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = environment.baseUrl;
  public usuarioSeleccionado: Cliente;

  constructor(private http: HttpClient) {
    const date = new Date();
    this.usuarioSeleccionado = {
      currency: {
        name: '',
        code: ''
      },
      _id: '',
      name: '',
      surname: '',
      birthday: date,
      email: '',
      address: '',
      company: '',
      contactNumber: 0,
      whatsapp: 0,
      password: '',
      __v: 0,
    };
  }

  /**
   * Guarda el cliente seleccionado para usarlo en otras vistas
   */
  setClientSelected(cliente: Cliente) {
    this.usuarioSeleccionado = cliente;
  }

  /**
   * Recupera el cliente previamente seleccionado
   */
  getClientSelected(): Cliente {
    return this.usuarioSeleccionado;
  }

  getCustomersLarge() {
    return this.http.get<any>('assets/customers-large.json')
      .toPromise()
      .then(res => <Customer[]>res.data)
      .then(data => { return data; });
  }

  getClients(): Observable<Clientes> {
    const url = `${this.baseUrl}/clients/all`;

    return this.http.get<Clientes>(url).pipe(
      map(resp => resp)
    );
  }

  updateClient(cliente: Cliente) {
    const body = {
      _id: cliente._id,
      name: cliente.name,
      surname: cliente.surname,
      birthday: cliente.birthday,
      email: cliente.email,
      address: cliente.address,
      company: cliente.company,
      contactNumber: cliente.contactNumber,
      whatsapp: cliente.whatsapp,
      country: cliente.country,
      currency: cliente.currency,
      password: ''
    };
    
    if (cliente.password) {
      body.password = cliente.password;
    }

    const url = `${this.baseUrl}/clients/update`;
    return this.http.post<any>(url, body).pipe(
      map(resp => resp)
    );
  }

  deleteClient(cliente: Cliente) {
    const url = `${this.baseUrl}/clients/${cliente._id}`;
    return this.http.delete<any>(url).pipe(
      map(resp => resp)
    );
  }
}
