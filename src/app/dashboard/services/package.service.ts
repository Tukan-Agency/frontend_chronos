import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Package, PackageResponse } from '../interfaces/package';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private baseUrl: string = environment.baseUrl;
  get usuario(){
    return this.authService.usuario;
  }
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getPackages() {
    const url = `${this.baseUrl}/package/all`;

    return this.http.get(url)
      .pipe(
        map(resp => {
          return resp;
        }),
      )
  }

  // REGISTRAR PAQUETE
  createPackage(pack: Package) {
    const url  = `${ this.baseUrl }/package/new`;
    const body = { pack };

    return this.http.post<PackageResponse>( url, body )
      .pipe(
        tap(({ok}) => {
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  // ACTUALIZAR PAQUETE
  updatePackage(pack: Package) {
    const body = {
      _id: this.usuario._id,
      package: pack
    }
    const url = `${this.baseUrl}/clients/update/package`;
    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          this.crearMovimiento(pack.name).subscribe(() => {
            return resp;
          });
        }),
      )
  }

  crearMovimiento(paqueteName: string) {
    const url  = `${ this.baseUrl }/movimientos/new`;

    const date = new Date();

    const body = {
      clientId: this.usuario._id,
      clientName: `${this.usuario.name} ${this.usuario.surname}`,
      type: 'Paquete',
      requestDate: date,
      status: 'Creado',
      value: paqueteName
    };

    return this.http.post<any>( url, body )
      .pipe(
        tap(({ok}) => {
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }
  
}
