import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { TableroComponent } from '../tablero/tablero.component';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { HomeComponent } from '../home/home.component';
import { ErrorPageComponent } from '../../../../shared/error-page/error-page.component';
import { RegistrarEmpresaComponent } from '../registrar-empresa/registrar-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'calculadora',
        component: CalculadoraComponent
      },
      {
        path: 'tablero',
        component: TableroComponent
      },
      {
        path: 'cotizacion',
        component: CotizacionComponent
      },
      {
        path: 'registrar-empresa',
        component: RegistrarEmpresaComponent
      },
      {
        path: 'editar-empresa/:id',
        component: RegistrarEmpresaComponent
      },
      {
        path: '**',
        component: ErrorPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
