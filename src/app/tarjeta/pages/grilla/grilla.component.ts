import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Empresa } from 'src/app/home/empresa/interfaces/empresa';
import { EmpresaService } from 'src/app/home/empresa/services/empresa.service';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styles: []
})
export class GrillaComponent implements OnInit {

  empresa: Empresa[] = [];

  consulta: string = "";
  mensaje: string = "";

  debouncer: Subject<string> = new Subject();

  constructor(private eService: EmpresaService) { }

  ngOnInit(): void {
    this.eService.landingEmpresa()
      .subscribe(resp => {
        this.empresa = resp;
      })

    this.debouncer
      .pipe(debounceTime(100))
      .subscribe(valor => {
        this.mensaje = '';
      })
  }

  buscando() {
    if (this.consulta.trim().length === 0) { return }
    this.eService.grillaEmpresa(this.consulta)
      .subscribe(resp => {
        if (resp.mensaje) {
          this.mensaje = resp.mensaje;
          this.empresa = []
          return
        } else {
          this.mensaje = '';
          this.empresa = resp
        }
      })
  }

  teclaPresionada() {
    this.debouncer.next(this.consulta);
  }

}
