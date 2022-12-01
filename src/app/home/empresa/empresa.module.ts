import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { RegistrarEmpresaComponent } from './pages/registrar-empresa/registrar-empresa.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';



@NgModule({
  declarations: [
    IndexComponent,
    RegistrarEmpresaComponent,
    DashboardComponent,
    HeaderComponent,
    CalculadoraComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpresaModule { }
