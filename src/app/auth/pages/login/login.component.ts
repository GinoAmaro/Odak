import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup = this.fb.group({
    correo: ['emzero1@gmail.com'],
    contrasena: ['123']
  })

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService, private titulo: Title) {
  }


  ngOnInit(): void {
    this.titulo.setTitle('Iniciar Sesion');
  }

  login() {

    const { correo, contrasena } = this.formularioLogin.value;

    this.authservice.login(correo, contrasena)
      .subscribe(resp => {
        if (resp[0].id) {
          this.router.navigateByUrl('/home/admin');
          this.titulo.setTitle('Home - Admin');
        }
      });

  }

}
