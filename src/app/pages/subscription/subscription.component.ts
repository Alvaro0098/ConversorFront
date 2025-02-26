import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent {
  private apiUrl = 'https://localhost:7198/api/User';

  constructor(private http: HttpClient) {}

  updateSubscription(plan: string): void {
    const url = `${this.apiUrl}?plan=${plan}`;

    // Recuperamos el token desde localStorage
    const token = localStorage.getItem('token');

    // Configuramos los headers con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.put(url, {}, { headers }).subscribe({
      next: () => alert(`Subscription updated to ${plan}!`),
      error: (err) => alert(`Error updating subscription: ${err.message}`),
    });
  }
}
