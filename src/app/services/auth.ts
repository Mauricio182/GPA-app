import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Estado de autenticación (Angular 16+ signals)
  private _isAuthenticated = signal(false);

  isAuthenticated = this._isAuthenticated.asReadonly();
    userList: any[] = [];


 constructor(private http: HttpClient) {
    this.http.get<any[]>('https://gp-app-29916-default-rtdb.firebaseio.com/asesores/.json').subscribe(
      (resp) => {
        this.userList = resp; // Aquí asignamos el resultado que es un array
        console.warn(this.userList);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  login(email: any, password: any): boolean {

    if (Object.values(this.userList).some(user => user.email === email && user.password === password)) {
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
