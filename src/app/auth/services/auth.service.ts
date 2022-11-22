import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Usuario, Login } from '../interface/auth';

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
      return of(false);
    }

    const datos = localStorage.getItem('token');

    return this.http.get<Usuario[]>(this.baseUrl + '?idUsuario=' + datos)
      .pipe(
        tap(resp => {
          if (resp[0]) {
            this._auth = {
              id: resp[0].id,
              nombre: resp[0].nombre,
              apellidos: resp[0].apellidos,
              correo: resp[0].correo,
              token: resp[0].token
            }
              , localStorage.setItem('token', resp[0].token)
          }
        }
        ),
        map(resp => {
          return true;
        }),
        catchError(err => of(err.error.mensaje, localStorage.clear()))
      );
  }

  login(correo: string, contrasena: string) {

    const url = this.baseUrl + "?login=";
    const datos = { correo, contrasena };

    return this.http.post<Usuario[]>(url, datos)
      .pipe(
        tap(resp => {
          if (resp[0]) {
            this._auth = {
              id: resp[0].id,
              nombre: resp[0].nombre,
              apellidos: resp[0].apellidos,
              correo: resp[0].correo,
              token: resp[0].token
            }
          }
        }
        ),
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      )
  }

  registrarUsuario(datoUsuario: Usuario) {

    const url = this.baseUrl + "?agregarUsuario=";

    return this.http.post<Usuario>(url, datoUsuario)
      .pipe(
        tap(resp => {
        }),
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      )
  }


  logOut() {
    localStorage.clear();
  }

  validarToken(token: string) {
    const url = this.baseUrl + "?validarToken=";
    return this.http.get<Usuario[]>(url + token)
      .pipe(
        tap(resp => {
          if (resp[0]) {
            this._auth = {
              id: resp[0].id,
              nombre: resp[0].nombre,
              apellidos: resp[0].apellidos,
              correo: resp[0].correo,
              token: resp[0].token
            }
          }
        }
        ),
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      )
  }


}
