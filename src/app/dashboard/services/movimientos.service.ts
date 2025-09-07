import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Movimientos } from '../interfaces/movimientos';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private baseUrl: string = environment.baseUrl;
  get usuario() {
    return this.authService.usuario;
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  getMovimientosPackage(): Observable<any> {
    const url = `${this.baseUrl}/movimientos/package`;

    return this.http.get(url)
      .pipe(
        map(resp => {
          return resp;
        }),
      )
  }

  getAllTypeMovements(): Observable<any> {
    const url = `${this.baseUrl}/movimientos/all`;

    return this.http.get(url)
      .pipe(
        map(resp => {
          return resp;
        }),
      )
  }

  getMovementByClient(): Observable<any> {
    const client = this.usuario;

    const url = `${this.baseUrl}/movimientos/clientId`;
    const headers = new HttpHeaders()
      .set('x-clientId', client._id || '');

    return this.http.get(url, { headers })
      .pipe(
        map(resp => {
          return resp;
        })
      )
  }

  deleteMovement(movement: any): Observable<any> {

    const url = `${this.baseUrl}/movimientos/delete`;
    const headers = new HttpHeaders()
      .set('x-requestId', movement.requestId || '')
      .set('x-movementId', movement._id || '');

    return this.http.delete(url, { headers })
      .pipe(
        map(resp => {
          return resp;
        })
      )
  }

  // ACTUALIZAR ESTADO
  updateStatus(movimiento: Movimientos, status: string) {
    const body = {
      _id: movimiento._id,
      status: status
    }
    const url = `${this.baseUrl}/movimientos/update/status`;
    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          return resp;
        }),
      )
  }
}
