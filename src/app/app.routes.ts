import { Routes } from '@angular/router';
import { LoginForm } from './components/views/login-form/login-form';
import { Paginator } from './components/views/paginator/paginator';
import { verifyGuard } from './guards/verify-guard';
import { NoAccessHome } from './components/views/no-access-home/no-access-home';

export const routes: Routes = [
  {
    path: 'home-login',
    title: 'home-login',
    component: LoginForm,
  },
  {
    path: 'start',
    title: 'start',
    canActivate: [verifyGuard],
    component: Paginator,
  },
    {
    path: 'no-auth',
    title: 'no-auth',
    component: NoAccessHome,
  },
  { path: '**', component: LoginForm },
];
