import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  constructor(private eService: EmpresaService) { }

  ngOnInit(): void {
    this.eService.landingEmpresa()
      .subscribe(resp => {
        this.empresa = resp;
      })
  }

  buscando() {
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

}
