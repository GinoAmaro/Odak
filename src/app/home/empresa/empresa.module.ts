import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule { }
