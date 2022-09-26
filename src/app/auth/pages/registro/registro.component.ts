import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  constructor(private titulo: Title, private fb: FormBuilder, private router: Router, private authservice: AuthService) { }

  formularioRegistro: FormGroup = this.fb.group({
    correo: ['emzero2@gmail.com', [Validators.required, Validators.email]],
    nombre: ['Paolo', [Validators.required, Validators.minLength(3)]],
    apellidos: ['Amaro Valladares', [Validators.required, Validators.minLength(3)]],
    contrasena: ['123', [Validators.required, Validators.minLength(3)]],
    confirmar: ['123', [Validators.required, Validators.minLength(3)]]
  })

  ngOnInit(): void {
    this.titulo.setTitle('Registrarse')
  }

  registrar() {

    const dato = this.formularioRegistro.value;

    this.authservice.registrarUsuario(dato)
      .subscribe(resp => console.log(resp)
      )

    // this.router.navigateByUrl('auth/login');

  }

}
