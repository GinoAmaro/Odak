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

  confirmacion: boolean = false;
  btnLogin: string = 'Iniciar Sesión';

  formularioLogin: FormGroup = this.fb.group({
    correo: ['emzero1@gmail.com'],
    contrasena: ['123'],
    confirmar: ['']
  })

  constructor(private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService) { }

  ingresar() {
    if (this.btnLogin == 'Iniciar Sesión') {
      this.login();
    } else if (this.btnLogin == 'Validar') {
      this.validar();
    }
  }

  login() {

    const { correo, contrasena } = this.formularioLogin.value;

    this.authservice.login(correo, contrasena)
      .subscribe(resp => {
        if (!resp.mensaje) {
          Swal.fire({
            title: 'Revisa tu correo',
            text: 'Te hemos enviado tu código de acceso',
            imageUrl: '../../../assets/img/login/comentario-info.svg',
            imageHeight: '100',
            timer: 4500,
            showConfirmButton: false
          })
          this.confirmacion = true;
          this.btnLogin = 'Validar';

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

  validar() {
    this.authservice.validarToken(this.formularioLogin.value.confirmar)
      .subscribe(resp => {
        if (!resp.mensaje) {
          Swal.fire({
            title: 'Bienvenido a ODAK',
            text: resp[0]['nombre'] + ' ' + resp[0]['apellidos'],
            imageUrl: '../../../assets/img/login/rayo-de-risa.svg',
            imageHeight: '100',
            timer: 2200,
            showConfirmButton: false
          }),
            localStorage.setItem('token', resp[0]['token']);
          this.router.navigateByUrl('/home/empresa');
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
      })
  }

}
