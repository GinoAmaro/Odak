import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

import { Plan } from '../interface/admin';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudPlanService {

  private url: string = environment.baseURL + "/usuarios/admin/crud-plan.php";

  constructor(private clienteHttp: HttpClient) { }

  agregarPlan(datoPlan: Plan): Observable<Plan> {
    return this.clienteHttp.post<Plan>(this.url + "?agregarPlan=", datoPlan)
  }

  ObetenerUsuarios(): Observable<Plan[]> {
    return this.clienteHttp.get<Plan[]>(this.url);
  }

  borrarPlan(id: number): Observable<Plan> {
    return this.clienteHttp.get<Plan>(this.url + "?borrarPlan=" + id);
  }

  consultarPlan(id: number): Observable<Plan[]> {
    return this.clienteHttp.get<Plan[]>(this.url + "?consultarPlan=" + id);
  }

  actualizarPlan(id: number, datoPlan: Plan): Observable<Plan> {
    return this.clienteHttp.post<Plan>(this.url + "?actualizarPlan=" + id, datoPlan);
  }

}
