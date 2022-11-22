import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  formularioLogin: FormGroup = this.fb.group({
    correo: ['emzero1@gmail.com'],
    contrasena: ['123']
  })

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) {

  }

  login() {

    const { correo, contrasena } = this.formularioLogin.value;

    this.authservice.login(correo, contrasena)
      .subscribe(resp => {
        if (!resp.mensaje) {
          Swal.fire({
            title: 'Bienvenido',
            text: resp[0].nombre + ' ' + resp[0].apellidos,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          })
          // this.router.navigateByUrl('/home/empresa');
        } else {
          Swal.fire({
            title: '¡Oh, vaya!',
            text: resp.mensaje,
            imageUrl: '../../../assets/img/login/rayo-de-tristeza.svg',
            imageHeight: '100',
            timer: 2000,
            showConfirmButton: false
          })
        }
      });


  }

}
