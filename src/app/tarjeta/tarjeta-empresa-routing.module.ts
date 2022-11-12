import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { TarjetaEmpresaComponent } from './pages/tarjeta-empresa/tarjeta-empresa.component';
import { GrillaComponent } from './pages/grilla/grilla.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pyme',
        component: GrillaComponent
      },
      {
        path: '',
        component: IndexComponent
      },
      {
        path: ':id',
        component: TarjetaEmpresaComponent
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaEmpresaRoutingModule { }
