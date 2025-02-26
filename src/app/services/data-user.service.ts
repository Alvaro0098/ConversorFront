import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class DataUserService {
  private apiUrl = 'https://localhost:7198/api/User'; // URL base del endpoint

  constructor(private http: HttpClient) {}

  getUserData(): Observable<UserData> {
    const token = localStorage.getItem('token'); // O sessionStorage
    if (!token) {
      throw new Error('No token found');
    }

    // Decodificar el token para obtener el userId
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.sub; // Verifica el nombre exacto del claim en el token

    // Agregar token en los headers (opcional, si el backend lo requiere)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<UserData>(`${this.apiUrl}?id=${userId}`, { headers });
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || null; // Verifica el nombre exacto del claim en el token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
