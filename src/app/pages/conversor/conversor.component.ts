import { Component } from '@angular/core';
import { Currency } from '../../interfaces/currency';
import { DataCurrencyService } from '../../services/data-currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conversion } from '../../interfaces/conversion';
import { DataConversionService } from '../../services/data-conversion.service';
import { UserData } from '../../interfaces/usuario';
import { DataUserService } from '../../services/data-user.service';
import { jwtDecode } from 'jwt-decode';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.scss',
})
export class ConversorComponent {
  currencies: Currency[] = [];
  conversion: Conversion = { amount: 0, currency1: '', currency2: '' };
  resultadoConversion: number | null = null;
  errorMessage: string = '';
  userData!: UserData;
  userId!: number | null;
  tries: number = 0;
  userName: string = '';

  constructor(
    private dataCurrencyService: DataCurrencyService,
    private dataConversionService: DataConversionService,
    private dataUserService: DataUserService
  ) {
    console.log('Token al iniciar Conversor:', localStorage.getItem('token'));
  }

  ngOnInit(): void {
    this.verifyUserId();

    if (this.userId) {
      this.loadUserData();
    } else {
      console.error('No se encontro userId');
    }

    this.loadCurrencies();
  }

  verifyUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.sub ? parseInt(decodedToken.sub, 10) : null;
      console.log('User ID from token:', this.userId);
    } else {
      console.error('No token found');
      this.userId = null;
    }
  }

  loadUserData(): void {
    if (!this.userId) {
      console.error('No se encontro el userId');
      return;
    }

    this.dataUserService.getUserData().subscribe(
      (data: UserData) => {
        this.userData = data;
        this.userName = data.userName;
        this.tries = data.maxTries;
        console.log('Datos de usuario recibidos:', this.userData);
      },
      (error) => {
        console.error('Error al obtener datos del usuario', error);
      }
    );
  }

  loadCurrencies(): void {
    this.dataCurrencyService.getCurrencies().subscribe(
      (data: Currency[]) => {
        console.log('Datos recibidos:', data);
        this.currencies = data;
      },
      (error) => {
        console.error('Error al obtener las monedas', error);
      }
    );
  }

  convertir(): void {
    if (!this.conversion.amount || this.conversion.amount <= 0) {
      console.error('El monto debe ser mayor a 0');
      return;
    }

    this.dataConversionService
      .convertirMoneda(
        this.conversion.amount,
        this.conversion.currency1,
        this.conversion.currency2
      )
      .subscribe({
        next: (resultado) => {
          this.resultadoConversion = resultado;
          this.tries -= 1;
          console.log(
            `Conversión exitosa: ${this.conversion.amount} ${this.conversion.currency1} = ${resultado} ${this.conversion.currency2}`
          );
          this.errorMessage = '';
          this.loadUserData();
        },
        error: (err) => {
          if (err.status === 400) {
            this.errorMessage = err.error;
          } else {
            this.errorMessage = 'Error inesperado en la conversión';
          }
          console.error('Error en la conversión', err);
        },
      });
  }
}
