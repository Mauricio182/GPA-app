import { Routes } from '@angular/router';
import { LoginForm } from './components/views/login-form/login-form';
import { Paginator } from './components/views/paginator/paginator';

export const routes: Routes = [
  {
    path: 'home-login',
    title: 'home-login',
    component: LoginForm,
  },
  {
    path: 'start',
    title: 'start',
    component: Paginator,
  },
  { path: '**', component: LoginForm },
];
