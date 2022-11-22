import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  nombreUsuario: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authService.validarToken(token!)
      .subscribe(resp => {
        this.nombreUsuario = resp[0]['nombre'] + ' ' + resp[0]['apellidos'];
      })
  }

  salir() {
    this.authService.logOut()
    this.router.navigateByUrl('auth/login');
    // console.log('salir');

  }

}
