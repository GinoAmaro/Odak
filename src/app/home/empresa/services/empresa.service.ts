import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, tap, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Categoria, Empresa, Cotizacion } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl: string = environment.baseURL + "/usuarios/empresa/crud-empresa.php";

  constructor(private http: HttpClient) { }


  mostrarCategoria(consulta: string) {
    const url = this.baseUrl + "?categoria=";
    return this.http.get<Categoria[]>(url + consulta)
  }

  registrarEmpresa(datosEmpresa: Empresa): Observable<Empresa> {
    const url = this.baseUrl + "?registrarEmpresa=";
    return this.http.post<Empresa>(url, datosEmpresa)
  }

  consultarEmpresa(id: number): Observable<Empresa[]> {
    const url = this.baseUrl + "?consultarEmpresa=";
    return this.http.get<Empresa[]>(url + id);
  }

  cotizarEmpresa(datoCotizar: Cotizacion) {
    const url = this.baseUrl + "?cotizarEmpresa=";
    return this.http.post<Cotizacion>(url, datoCotizar)
      .pipe(
        tap(resp => {
        }),
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      )
  }


}

