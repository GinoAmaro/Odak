import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { CarrouselLoginComponent } from './components/carrousel-login/carrousel-login.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegistroEmpresaComponent } from './pages/registro-empresa/registro-empresa.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    CarrouselLoginComponent,
    RegistroEmpresaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
