import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { TableroComponent } from '../tablero/tablero.component';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
