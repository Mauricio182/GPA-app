import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Http {

  constructor(private http: HttpClient) {}
private apiUrl = 'https://gp-app-29916-default-rtdb.firebaseio.com';

crearPost(data: any): Observable<any> {
  console.log('crear empleado activado');
  return this.http.post(this.apiUrl+'/altas-bajas.json', data);
}

getData(): Observable<any> {
  return this.http.get(this.apiUrl); // devuelve todos los empleados
}

createAdviser(data: any): Observable<any> {
  console.log('crear asesor');
  return this.http.post(this.apiUrl+'/asesores.json', data); 
}

deleteAdviser(id: string): Observable<any> {
  return this.http.delete(this.apiUrl + `/asesores/${id}.json`);
}

getAdvisers(): Observable<any[]> {
  return this.http.get<any>(this.apiUrl + '/asesores.json').pipe(
    map(data => {
      if (!data) return [];

      return Object.keys(data).map(key => ({
        id: key,
        name: data[key].name,
        lastName: data[key].lastName,
        email: data[key].email
      }));
    })
  );
}
  
}
