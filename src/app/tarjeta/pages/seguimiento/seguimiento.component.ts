import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../home/empresa/services/empresa.service';
import { buscarCotizacion, buscarSeguimiento } from '../../../home/empresa/interfaces/seguimiento';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styles: [
  ]
})
export class SeguimientoComponent implements OnInit {

  consulta: string = '';
  noEncontrado: boolean = false;
  respuestaCotizacion: buscarCotizacion[] = [];
  respuestaSeguimiento: buscarSeguimiento[] = [];

  debouncer: Subject<string> = new Subject();

  constructor(private eService: EmpresaService) { }

  ngOnInit(): void {

    this.debouncer
      .pipe(debounceTime(100))
      .subscribe(valor => {
        this.noEncontrado = false;
      })
  }

  buscando() {
    if (this.consulta.trim().length === 0) { return }
    this.eService.buscarCotizacion(this.consulta)
      .subscribe(resp => {
        if (resp.mensaje) {
          this.noEncontrado = true;
          this.respuestaCotizacion = [];
          this.respuestaSeguimiento = [];
        } else {
          this.respuestaCotizacion = resp;
        }
      })

    this.eService.buscarSeguimiento(this.consulta)
      .subscribe(resp => {
        if (!resp.mensaje) {
          this.respuestaSeguimiento = resp;
        }
      })
  }

  teclaPresionada() {
    this.debouncer.next(this.consulta);
  }

}
