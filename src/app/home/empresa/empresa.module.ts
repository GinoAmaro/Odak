import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { RegistrarEmpresaComponent } from './pages/registrar-empresa/registrar-empresa.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { TableroComponent } from './pages/tablero/tablero.component';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    IndexComponent,
    RegistrarEmpresaComponent,
    DashboardComponent,
    HeaderComponent,
    CalculadoraComponent,
    TableroComponent,
    CotizacionComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpresaModule { }
