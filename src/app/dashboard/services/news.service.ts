import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Obtener Ordenes
  getNoticia(): Observable<any> {
    const url = `${this.baseUrl}/news/obtener`;

    return this.http.get(url)
      .pipe(
        map(resp => {
          return resp;
        }),
      )
  }

  // ACTUALIZAR ESTADO
  updateStatus(news: string) {
    const body = {
      _id: '6308f9b7b6b092a2cb9b73b5',
      news: news
    }
    const url = `${this.baseUrl}/news/actualizar`;
    return this.http.post<any>(url, body)
      .pipe(
        map(resp => {
          return resp;
        }),
      )
  }
}
