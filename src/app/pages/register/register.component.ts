import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { RegisterUser } from '../../interfaces/registerUser';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(DataAuthService);
  router = inject(Router);

  /** Intenta registrar al usuario en el back */
  async register(registerForm: NgForm) {
    if (registerForm.invalid) return; // Evitar enviar datos vacíos

    const { usuario, password } = registerForm.value; // Obtener valores del formulario

    const registerData: RegisterUser = {
      username: usuario,
      password: password,
    };

    try {
      const register = await this.authService.register(registerData);

      if (register?.success) {
        console.log('Usuario registrado con éxito');
        this.router.navigate(['/login']); // Redirigir al login
      } else {
        console.error(register?.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro', error);
    }
  }
}

/** Datos de formulario de registro */
