import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CrudPlanService } from '../../services/crud-plan.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-plan.component.html',
  styles: [
  ]
})
export class AgregarPlanComponent implements OnInit {

  formularioUsuario: FormGroup = this.fb.group({
    id: [''],
    descripcion: [''],
    costo: [],
    detalle: [''],
    usuario_cantidad: [],
    estado: ['true']
  });

  titulo: string = 'Agregar';

  constructor(private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private crudService: CrudPlanService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.crudService.consultarPlan(id))
      )
      .subscribe(plan => {
        this.formularioUsuario.setValue({
          id: plan[0]['id'],
          descripcion: plan[0]['descripcion'],
          costo: plan[0]['costo'],
          detalle: plan[0]['detalle'],
          usuario_cantidad: plan[0]['usuario_cantidad'],
          estado: plan[0]['estado']
        });

        if (this.formularioUsuario.value.id) {
          this.titulo = 'Actualizar';
        }
      });
  }

  agregarDatos() {
    this.crudService.agregarPlan(this.formularioUsuario.value).subscribe(
      resp => {
        this.router.navigate(['/home/admin/listado']);
      }
    );
  }

  actualizarDatos() {
    this.crudService.actualizarPlan(this.formularioUsuario.value.id, this.formularioUsuario.value).subscribe(
      resp => {
        this.router.navigate(['/home/admin/listado']);
      }
    );
  }


  enviarDatos() {
    if (this.formularioUsuario.value.id.trim().length === 0) {
      this.agregarDatos();
    } else {
      this.actualizarDatos();
    }
    return;
  }
}
