import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario, Login } from '../interface/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseURL + "/login/login.php";
  private _auth!: Login;

  get auth() {
    return { ...this._auth };
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {

    if (!localStorage.getItem('token')) {
      console.log(false);

      return of(false);
    }

    const datos = localStorage.getItem('token');

    return this.http.get<Usuario[]>(this.baseUrl + '?idUsuario=' + datos)
      .pipe(
        map(resp => {
          this._auth = {
            id: resp[0].id,
            nombre: resp[0].nombre,
            apellidos: resp[0].apellidos,
            correo: resp[0].correo
          }
          return true
        })
      );


  }

  login(correo: string, contrasena: string): Observable<Usuario[]> {

    const url = this.baseUrl + "?login=";
    const datos = { correo, contrasena };

    return this.http.post<Usuario[]>(url, datos)
      .pipe(
        tap(resp => {
          this._auth = {
            id: resp[0].id,
            nombre: resp[0].nombre,
            apellidos: resp[0].apellidos,
            correo: resp[0].correo
          }
        }),
        tap(resp => localStorage.setItem('token', resp[0].id))
      )
  }

  logOut() {
    localStorage.clear();
  }
}
