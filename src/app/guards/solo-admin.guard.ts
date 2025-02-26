import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataUserService } from '../services/data-user.service'; // Asegúrate de que este servicio existe

@Injectable({
  providedIn: 'root',
})
export class SoloAdminGuard implements CanActivate {
  constructor(private authService: DataUserService, private router: Router) {}

  canActivate(): boolean {
    const userRole: string | null = this.authService.getUserRole();

    if (userRole === 'admin') {
      return true; // ✅ Permitir acceso si el usuario es admin
    } else {
      this.router.navigate(['/']); // 🔴 Redirigir si no es admin
      return false;
    }
  }
}
