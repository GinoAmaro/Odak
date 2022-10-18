import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria, Empresa } from '../interfaces/empresa';
import { Observable } from 'rxjs';

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



}

