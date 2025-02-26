import { Component, Input } from '@angular/core';
import { CreateCurrency, Currency } from '../../interfaces/currency';
import { DataCurrencyService } from '../../services/data-currency.service';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent {
  currencies: Currency[] = [];
  showForm = false;
  @Input() selectedCurrency: Currency = {
    id: 0,
    code: '',
    symbol: '',
    ic: 0,
    description: '',
  };

  showEditForm: boolean = false;
  newCurrency: CreateCurrency = {
    code: '',
    symbol: '',
    ic: 0,
    description: '',
  };

  constructor(private dataCurrencyService: DataCurrencyService) {
    console.log(
      'Token al iniciar al panel administrativo:',
      localStorage.getItem('token')
    );
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  closeEditForm(): void {
    this.showEditForm = false;
  }

  ngOnInit(): void {
    this.loadCurrencies(); // Luego cargamos las monedas
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

  createCurrency(form: NgForm) {
    if (form.invalid) return;

    const newCurrency: CreateCurrency = form.value; // Obtener los datos del formulario

    this.dataCurrencyService.createCurrency(newCurrency).subscribe({
      next: () => {
        this.loadCurrencies(); // Agregar a la tabla
        this.toggleForm(); // Cerrar formulario
        form.resetForm(); // Limpiar el formulario
      },
      error: (error) => {
        console.error('Error creating currency:', error);
        alert('Failed to create currency');
      },
    });
  }

  deleteCurrency(id: number): void {
    if (!confirm('Are you sure you want to delete this currency?')) return;

    this.dataCurrencyService.deleteCurrency(id).subscribe({
      next: () => {
        this.currencies = this.currencies.filter(
          (currency) => currency.id !== id
        );
      },
      error: (error) => {
        console.error('Error deleting currency:', error);
        alert('Failed to delete currency');
      },
    });
  }

  updateCurrency(form: NgForm): void {
    if (form.invalid) return;

    this.dataCurrencyService
      .updateCurrency(this.selectedCurrency.id, form.value)
      .subscribe({
        next: () => {
          alert('Currency updated successfully');
          this.toggleEditForm();
        },
        error: (error) => {
          console.error('Error updating currency:', error);
          alert('Failed to update currency');
        },
      });
  }
}
