import { Injectable } from '@angular/core';
import { Login, ResLogin } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';
import { RegisterUser } from '../interfaces/registerUser';
import { ResponseData } from '../interfaces/responseData';

@Injectable({
  providedIn: 'root',
})
export class DataAuthService {
  constructor() {}

  usuario: Usuario | undefined;

  async login(loginData: Login) {
    console.log('Datos enviados al backend:', JSON.stringify(loginData));

    const res = await fetch('https://localhost:7198/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (res.status !== 200) return;

    const resJson: ResLogin = await res.json();

    if (resJson.token) {
      localStorage.setItem('token', resJson.token);
      console.log('Token guardado:', localStorage.getItem('token'));
    }

    return resJson;
  }

  async register(registerData: RegisterUser): Promise<ResponseData> {
    const apiUrl = 'https://localhost:7198/api/User';

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      if (!res.ok) {
        return { success: false, message: 'Error registrando usuario' };
      }

      return { success: true, message: 'Usuario creado con éxito' };
    } catch (error) {
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  }
}
