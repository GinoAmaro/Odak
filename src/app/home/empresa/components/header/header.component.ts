import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  nombreUsuario: string = '';
  idEmpresa: number = 0;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authService.validarToken(token!)
      .subscribe(resp => {
        this.nombreUsuario = resp[0]['nombre'] + ' ' + resp[0]['apellidos'];

        this.idEmpresa = resp[0]['id'];
      })
  }

  salir() {
    this.authService.logOut()
    this.router.navigateByUrl('auth/login');
    // console.log('salir');

  }

}
