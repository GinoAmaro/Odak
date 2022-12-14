import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TarjetaEmpresaRoutingModule } from './tarjeta-empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { TarjetaEmpresaComponent } from './pages/tarjeta-empresa/tarjeta-empresa.component';
import { GrillaComponent } from './pages/grilla/grilla.component';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';


@NgModule({
  declarations: [
    IndexComponent,
    TarjetaEmpresaComponent,
    GrillaComponent,
    SeguimientoComponent
  ],
  imports: [
    CommonModule,
    TarjetaEmpresaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TarjetaEmpresaModule { }
