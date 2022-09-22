import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
        if (resp[0].id) {
          this.router.navigateByUrl('/home/admin');
        }
      });

  }

}
