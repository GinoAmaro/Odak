import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../home/empresa/services/empresa.service';
import { buscarCotizacion, buscarSeguimiento } from '../../../home/empresa/interfaces/seguimiento';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styles: [
  ]
})
export class SeguimientoComponent implements OnInit {

  consulta: number = 4000003;
  respuestaCotizacion: buscarCotizacion[] = [];
  respuestaSeguimiento: buscarSeguimiento[] = [];

  constructor(private eService: EmpresaService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.eService.buscarCotizacion(this.consulta)
      .subscribe(resp => {
        this.respuestaCotizacion = resp;
      })

    this.eService.buscarSeguimiento(this.consulta)
      .subscribe(resp => {
        this.respuestaSeguimiento = resp;
      })
  }

}
