import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

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
