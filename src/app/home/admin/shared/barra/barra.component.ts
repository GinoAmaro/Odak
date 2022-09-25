import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../../auth/services/auth.service';
import { Rutas } from '../../interface/rutas';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styles: [
  ]
})
export class BarraComponent implements OnInit {

  ruta: Rutas[] = [
    {
      descripcion: 'Inicio',
      ruta: 'index'
    },
    {
      descripcion: 'Agregar Plan',
      ruta: 'agregar-plan'
    },
    {
      descripcion: 'Listado de Planes',
      ruta: 'listado'
    }
  ]

  get auth() {
    return this.authservice.auth;
  }

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit(): void { }

  cerrarSesion() {
    this.router.navigateByUrl('/auth')
  }

}
