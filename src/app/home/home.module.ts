import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AdminModule } from './admin/admin.module';
import { EmpresaModule } from './empresa/empresa.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AdminModule,
    EmpresaModule
  ],
  exports: []
})
export class HomeModule { }
