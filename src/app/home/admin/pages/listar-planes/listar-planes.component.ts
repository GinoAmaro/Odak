import { Component, OnInit } from '@angular/core';
import { CrudPlanService } from '../../services/crud-plan.service';
import {  Plan } from '../../interface/admin';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-planes.component.html',
  styles: []
})
export class ListarPlanesComponent implements OnInit {

  planes: Plan[] = [];

  constructor(private crudservice: CrudPlanService) { }

  ngOnInit(): void {
    this.crudservice.ObetenerUsuarios().subscribe(
      resp => {
        this.planes = resp;
      }
    )
  }

  borrar(id: number, idControl: number) {
    this.crudservice.borrarPlan(id).subscribe(
      resp => {
        this.planes.splice(idControl, 1);
      }
    );
  }

}
