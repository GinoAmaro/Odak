import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { ListarPlanesComponent } from './pages/listar-planes/listar-planes.component';
import { AgregarPlanComponent } from './pages/agregar-plan/agregar-plan.component';
import { BarraComponent } from './shared/barra/barra.component';


@NgModule({
  declarations: [
    IndexComponent,
    ListarPlanesComponent,
    AgregarPlanComponent,
    BarraComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
