import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPlanComponent } from './pages/agregar-plan/agregar-plan.component';
import { IndexComponent } from './pages/index/index.component';
import { ListarPlanesComponent } from './pages/listar-planes/listar-planes.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'agregar-plan',
        component: AgregarPlanComponent
      },
      {
        path: 'editar-plan/:id',
        component: AgregarPlanComponent
      },
      {
        path: 'listado',
        component: ListarPlanesComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
