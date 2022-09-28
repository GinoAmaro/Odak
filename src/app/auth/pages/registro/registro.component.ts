import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

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
    const nombre = this.formularioRegistro.value.nombre

    this.authservice.registrarUsuario(dato)
      .subscribe(resp => {
        if (!resp.mensaje) {
          Swal.fire({
            title: 'Que buena noticia ' + nombre,
            text: "Registra tu PYME ahora",
            imageUrl: '../../../assets/img/login/rayo-de-risa.svg',
            imageHeight: '100',
            footer: 'Ya eres parte de ODAK',
            showCancelButton: true,
            confirmButtonColor: '#2f3e46',
            cancelButtonColor: '#84a98c',
            confirmButtonText: 'Registrar PYME',
            cancelButtonText: 'Despues',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('auth/login');
            }
          })


          // Swal.fire({ title: 'Que buena noticia ' + nombre, text: 'Ya eres parte de ODAK', icon: 'success', timer: 2500, showConfirmButton: false })
        } else {
          Swal.fire({
            title: 'Lo Siento',
            text: resp.mensaje,
            imageUrl: '../../../assets/img/login/rayo-de-tristeza.svg',
            imageHeight: '100',
            timer: 2500,
            showConfirmButton: false
          })
        }
      }
      )

    // this.router.navigateByUrl('auth/login');

  }

}
