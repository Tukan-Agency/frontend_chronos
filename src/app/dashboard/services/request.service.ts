import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import {Request, RequestResponse, RequestResponseUid} from '../interfaces/request';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private baseUrl: string = environment.baseUrl;
    get usuario() {
        return this.authService.usuario;
    }

    constructor(private http: HttpClient, private authService: AuthService) { }

    // Registrar solicitud
    createRequest(request: Request) {
        const url = `${this.baseUrl}/request/new`;
        request.clientId = this.usuario._id!;
        request.clientName = `${this.usuario.name} ${this.usuario.surname}`
        const body = { request };

        return this.http.post<RequestResponseUid>(url, body)
            .pipe(
                tap((data) => {
                  const {ok, uid} =  data
                  console.log(data, 'Data antes de crear el movimiento')
                    this.crearMovimiento(request.requestType, request.requestedValue, uid).subscribe(() => {
                        return ok;
                    });
                }),
                map(resp => resp.ok),
                catchError(err => of(err.error.msg))
            );
    }

    // Obtener Requests
    getRequest(): Observable<any> {
        const url = `${this.baseUrl}/request/all`;

        return this.http.get(url)
            .pipe(
                map(resp => {
                    return resp;
                }),
            )
    }

    // Crear Movimiento para los Request(retiro, deposito)
    crearMovimiento(requestType: string, requestValue: number, requestID: string | undefined, date: Date =  new Date(), clientId:string | null | undefined = this.usuario._id) {
        const url = `${this.baseUrl}/movimientos/new`;

        const body = {
            clientId: clientId,
            clientName: `${this.usuario.name} ${this.usuario.surname}`,
            requestId: requestID,
            type: requestType,
            requestDate: date,
            status: 'Creado',
            value: requestValue.toString()
        };

        return this.http.post<any>(url, body)
            .pipe(
                tap(({ ok }) => {
                }),
                map(resp => resp.ok),
                catchError(err => of(err.error.msg))
            );
    }

    // Actualizar Estado
    updateStatus(solicitud: Request, status: string) {
        const body = {
            _id: solicitud._id,
            status: status
        }
        const url = `${this.baseUrl}/request/update/status`;
        return this.http.post<any>(url, body)
            .pipe(
                map(resp => {
                    return resp;
                })
            )
    }
}
