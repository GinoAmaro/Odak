import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../../home/empresa/services/empresa.service';
import { Empresa } from '../../../home/empresa/interfaces/empresa';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tarjeta-empresa',
  templateUrl: './tarjeta-empresa.component.html',
  styles: [
  ]
})
export class TarjetaEmpresaComponent implements OnInit {

  datoEmpresa: Empresa = {
    rut: '',
    nombre_fantasia: '',
    categoria: '',
    comuna: '',
    direccion: '',
    telefono: '',
    correo: '',
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


  constructor(private eService: EmpresaService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.eService.consultarEmpresa(id))
      )
      .subscribe(empresa => {
        if (!empresa[0].rut) {
          console.log('no existe dato');
        }
        this.datoEmpresa = empresa[0];
      });

  }

}
