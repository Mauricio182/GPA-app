import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Http {

  constructor(private http: HttpClient) {}
private apiUrl = 'https://gp-app-29916-default-rtdb.firebaseio.com/empleados.json';

crearPost(data: any): Observable<any> {
  console.log('crear empleado activado');
  return this.http.post(this.apiUrl, data); // ahora sí va al endpoint correcto
}

getData(): Observable<any> {
  return this.http.get(this.apiUrl); // devuelve todos los empleados
}
  
}
