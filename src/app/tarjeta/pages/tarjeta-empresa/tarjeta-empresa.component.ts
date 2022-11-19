import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../../home/empresa/services/empresa.service';
import { Empresa, Referencia } from '../../../home/empresa/interfaces/empresa';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-tarjeta-empresa',
  templateUrl: './tarjeta-empresa.component.html',
  styleUrls: ['./tarjeta-empresa.component.css']
})
export class TarjetaEmpresaComponent implements OnInit {

  mailto: string = 'mailto:';
  idEmpresa!: string;
  mostrarReferencias: boolean = true;

  referencias: Referencia[] = [];

  datoEmpresa: Empresa = {
    id: '',
    rut: '',
    nombre_fantasia: '',
    categoria: '',
    comuna: '',
    direccion: '',
    telefono: '',
    correo: '',
    titulo_descripcion: '',
    descripcion: '',
    twitter: '',
    facebook: '',
    whatsapp: '',
    instagram: '',
    linkedin: '',
    prueba: '',
    imagen_logo: '',
    imagen_fondo: ''
  }

  formularioCotizar: FormGroup = this.fb.group({
    empresa: [''],
    cliente: ['Gino Amaro'],
    correo_cliente: ['emzero1@gmail.com'],
    telefono_cliente: ['972003262'],
    solicitud_cliente: ['Compra de Cereza 10 kilos']
  })

  prueba: any;

  constructor(private eService: EmpresaService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {


    this.activeRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.eService.consultarEmpresa(id)
        )
      )
      .subscribe(empresa => {

        this.prueba = empresa
        if (this.prueba.mensaje) {
          this.router.navigate(['404']);
          return
        }


        this.datoEmpresa = empresa[0];
        this.mailto = this.mailto + empresa[0].correo;
        this.idEmpresa = empresa[0].id;

        if (!this.datoEmpresa.imagen_logo) {
          this.datoEmpresa.imagen_logo = '../../../assets/img/favicon/apple-touch-icon.png'
        }

        if (!this.datoEmpresa.imagen_fondo) {
          this.datoEmpresa.imagen_fondo = '../../../assets/img/tarjeta/fondo.jpg'
        }
      });

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.eService.buscarReferencia(id)))
      .subscribe(respuesta => {
        if (respuesta.mensaje) {
          this.mostrarReferencias = false;
          console.log(respuesta.mensaje);
          return
        }
        this.referencias = respuesta;
      })

  }

  cotizar() {

    Swal.fire({
      title: 'Enviamos la cotización?',
      imageUrl: this.datoEmpresa.imagen_logo,
      imageHeight: '100',
      footer: ' <b>ODAK</b>&nbsp' + this.datoEmpresa.nombre_fantasia,
      showCancelButton: true,
      confirmButtonColor: '#2f3e46',
      cancelButtonColor: '#84a98c',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this.formularioCotizar.value.empresa = this.idEmpresa;
        const dato = this.formularioCotizar.value;
        this.eService.cotizarEmpresa(dato)
          .subscribe(resp => {
            if (resp.mensaje) {
              Swal.fire({
                title: resp.mensaje,
                imageUrl: '../../../assets/img/login/rayo-de-risa.svg',
                imageHeight: '100',
                footer: ' <b>ODAK</b>&nbsp' + this.datoEmpresa.nombre_fantasia,
                timer: 2500,
                showConfirmButton: false
              })
            }
          })
        this.formularioCotizar.reset();
      }
    })


  }

}
