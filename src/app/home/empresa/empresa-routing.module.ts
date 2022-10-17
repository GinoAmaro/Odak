import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { RegistrarEmpresaComponent } from './pages/registrar-empresa/registrar-empresa.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'registrar-empresa',
        component: RegistrarEmpresaComponent
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
export class EmpresaRoutingModule { }
