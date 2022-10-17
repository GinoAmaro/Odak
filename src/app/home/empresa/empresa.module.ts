import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { RegistrarEmpresaComponent } from './pages/registrar-empresa/registrar-empresa.component';



@NgModule({
  declarations: [
    IndexComponent,
    RegistrarEmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpresaModule { }
