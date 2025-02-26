import { Injectable } from '@angular/core';
import { CreateCurrency, Currency } from '../interfaces/currency';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataCurrencyService {
  private getAllUrl = 'https://localhost:7198/api/Currency/all';
  private apiUrl = 'https://localhost:7198/api/Currency';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Agrega el token en los headers
    });
  }
  // Método para obtener las monedas
  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.getAllUrl}`, {
      headers: this.getHeaders(),
    });
  }

  createCurrency(currency: CreateCurrency): Observable<CreateCurrency> {
    return this.http.post<CreateCurrency>(`${this.apiUrl}`, currency, {
      headers: this.getHeaders(),
    });
  }

  deleteCurrency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateCurrency(id: number, currency: CreateCurrency): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, currency, {
      headers: this.getHeaders(),
    });
  }
}
