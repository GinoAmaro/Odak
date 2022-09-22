import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TarjetaEmpresaComponent } from './pages/tarjeta-empresa/tarjeta-empresa.component';

const routes: Routes = [
  {
    path: '',
    children: [
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
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetaEmpresaRoutingModule { }
