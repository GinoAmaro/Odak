import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  constructor(private titulo: Title, private fb: FormBuilder, private router: Router) { }

  formularioRegistro: FormGroup = this.fb.group({
    correo: ['emzero1@gmail.com', [Validators.required, Validators.email]],
    contrasena: ['123', [Validators.required, Validators.minLength(3)]],
    confirmar: ['123', [Validators.required, Validators.minLength(3)]]
  })

  ngOnInit(): void {
    this.titulo.setTitle('Registrarse')
  }

  registrar() {

    const { correo, contrasena, confirmar } = this.formularioRegistro.value;

    console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro.valid);

    this.router.navigateByUrl('auth/login');


  }

}
