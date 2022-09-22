import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetaEmpresaRoutingModule } from './tarjeta-empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    TarjetaEmpresaRoutingModule
  ]
})
export class TarjetaEmpresaModule { }
