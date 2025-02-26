import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataConversionService {
  private apiUrl = 'https://localhost:7198/api/convert';

  constructor(private http: HttpClient) {}

  convertirMoneda(
    monto: number,
    monedaOrigen: string,
    monedaDestino: string
  ): Observable<number> {
    const token = localStorage.getItem('token');
    console.log('Token antes de enviar petición:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      amount: monto,
      fromCurrency: monedaOrigen,
      toCurrency: monedaDestino,
    };

    if (!token) {
      console.error('No hay token disponible en localStorage');
    }

    return this.http.post<number>(this.apiUrl, body, { headers });
  }
}
