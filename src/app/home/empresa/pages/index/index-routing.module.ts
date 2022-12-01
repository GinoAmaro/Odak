import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

const routes: Routes = [
  {
    path:'',
    component:IndexComponent,
    children:[
      {
        path:'calculadora',
        component:CalculadoraComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
