import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Estado de autenticación (Angular 16+ signals)
  private _isAuthenticated = signal(false);

  isAuthenticated = this._isAuthenticated.asReadonly();

  login(email: any, password: any): boolean {
    const gpemail = 'jorge@gp.com'
    const gppass = '12345'

    if (email == gpemail && password == gppass) {
      this._isAuthenticated.set(true);
      console.warn('llaves correctas')
      return true;
    }
    return false;
  }

  logout() {
    this._isAuthenticated.set(false);
  }
}
