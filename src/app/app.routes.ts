import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ConversorComponent } from './pages/conversor/conversor.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { SoloAdminGuard } from './guards/solo-admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [soloPublicoGuard]
  },
  {
    path: 'conversor',
    component: ConversorComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
  },
  {
    path: 'currency',
    component: CurrencyComponent,
    canActivate: [SoloAdminGuard],
  },
];
