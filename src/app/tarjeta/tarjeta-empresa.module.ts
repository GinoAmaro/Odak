import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TarjetaEmpresaRoutingModule } from './tarjeta-empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { TarjetaEmpresaComponent } from './pages/tarjeta-empresa/tarjeta-empresa.component';


@NgModule({
  declarations: [
    IndexComponent,
    TarjetaEmpresaComponent
  ],
  imports: [
    CommonModule,
    TarjetaEmpresaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TarjetaEmpresaModule { }
