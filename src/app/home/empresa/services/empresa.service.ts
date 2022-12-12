import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, tap, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Categoria, Empresa, Cotizacion, Referencia, ContarCotizacion, ResolverCotizacion, Cotizar } from '../interfaces/empresa';
import { buscarCotizacion, buscarSeguimiento } from '../interfaces/seguimiento';
import { Indicadores } from '../interfaces/indicadores';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl: string = environment.baseURL + "/usuarios/empresa/crud-empresa.php";
  private baseIndicadores: string = environment.baseIndicadores;

  constructor(private http: HttpClient) { }


  mostrarCategoria(consulta: string) {
    const url = this.baseUrl + "?categoria=";
    return this.http.get<Categoria[]>(url + consulta)
  }

  registrarEmpresa(datosEmpresa: Empresa): Observable<Empresa> {
    const url = this.baseUrl + "?registrarEmpresa=";
    return this.http.post<Empresa>(url, datosEmpresa)
  }

  actualizarEmpresa(datosEmpresa: Empresa): Observable<Empresa> {
    const url = this.baseUrl + "?actualizarEmpresa=";
    return this.http.post<Empresa>(url, datosEmpresa)
  }

  consultarEmpresa(id: number): Observable<Empresa[]> {
    const url = this.baseUrl + "?consultarEmpresa=";
    return this.http.get<Empresa[]>(url + id);
  }

  consultarParaEditar(id: number): Observable<Empresa[]> {
    const url = this.baseUrl + "?consultarParaEditar=";
    return this.http.get<Empresa[]>(url + id);
  }

  cotizarEmpresa(datoCotizar: Cotizar) {
    const url = this.baseUrl + "?cotizarEmpresa=";
    return this.http.post<Cotizar>(url, datoCotizar)
    .pipe(
      map(resp => resp),
      catchError(err => of(err.error.mensaje))
    )
  }

  listarCotizaciones(id: number) {
    const url = this.baseUrl + "?listarCotizaciones=";
    return this.http.get<Cotizacion[]>(url + id)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      );
  }

  resolverCotizacion(resolver: ResolverCotizacion) {
    const url = this.baseUrl + "?resolverCotizacion=";
    return this.http.post<ResolverCotizacion[]>(url, resolver)
      .pipe(
        tap(resp => {
        }),
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      );
  }

  landingEmpresa(): Observable<Empresa[]> {
    const url = this.baseUrl + "?landingEmpresa=";
    return this.http.get<Empresa[]>(url);
  }

  contarCotizacion(id: number): Observable<ContarCotizacion[]> {
    const url = this.baseUrl + "?contarCotizacion=";
    return this.http.get<ContarCotizacion[]>(url + id)
  }

  grillaEmpresa(consulta: string) {
    const url = this.baseUrl + "?grillaEmpresa=";
    return this.http.get<Empresa[]>(url + consulta)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      );
  }

  agregarReferencia(datoreferencia: Referencia) {
    const url = this.baseUrl + "?agregarReferencia=";
    return this.http.post<Referencia>(url, datoreferencia)
  }

  buscarReferencia(consulta: string) {
    const url = this.baseUrl + "?buscarReferencia=";
    return this.http.get<Referencia[]>(url + consulta)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      )
  }

  borrarReferencia(id: number): Observable<Referencia> {
    const url = this.baseUrl + "?borrarReferencia=";
    return this.http.get<Referencia>(url + id)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      )
  }

  buscarCotizacion(id: string) {
    const url = this.baseUrl + "?buscarCotizacion=";
    return this.http.get<buscarCotizacion[]>(url + id)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      );
  }

  buscarSeguimiento(id: string) {
    const url = this.baseUrl + "?buscarSeguimiento=";
    return this.http.get<buscarSeguimiento[]>(url + id)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      );
  }

  idicadoresEconomicos(): Observable<Indicadores> {
    return this.http.get<Indicadores>(this.baseIndicadores)
  }

  listarColaboradoresCotizacion(id: number) {
    const url = this.baseUrl + "?listarColaboradoresCotizacion=";
    return this.http.get<Cotizacion[]>(url + id)
      .pipe(
        map(resp => resp),
        catchError(err => of(err.error.mensaje))
      );
  }

}