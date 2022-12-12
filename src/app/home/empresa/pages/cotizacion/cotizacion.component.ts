import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Cotizacion, Colaboradores } from '../../interfaces/empresa';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styles: [
  ]
})
export class CotizacionComponent implements OnInit {

  cotizacion: boolean = true;
  idEmpresa: number = 0;
  trabajador: number = 0;
  listaCotizaciones: Cotizacion[] = [];
  listaColaboradores: Colaboradores[] = [];

  constructor(private eService: EmpresaService, private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authService.validarToken(token!)
      .subscribe(resp => {
        this.idEmpresa = resp[0]['empresa'];

        this.eService.listarCotizaciones(this.idEmpresa)
          .subscribe(resp => {
            if (!resp.mensaje) {
              this.cotizacion = false;
            }
            this.listaCotizaciones = resp;
          })

        this.eService.listarColaboradoresCotizacion(this.idEmpresa)
          .subscribe(resp => {
            this.listaColaboradores = resp;
          })



      })
  }


  aceptarCotizacion(id: number, idControl: number) {
    const decision: string = 'Aceptada';
    const colaborador: number = this.trabajador;

    this.eService.resolverCotizacion({ id, decision, colaborador })
      .subscribe(resp => {
        this.listaCotizaciones.splice(idControl, 1);
        if (this.listaCotizaciones.length == 0) {
          this.cotizacion = true;
        }
      })
  }

  rechazarCotizacion(id: number, idControl: number) {
    const decision: string = 'Rechazada';

    this.eService.resolverCotizacion({ id, decision })
      .subscribe(resp => {
        this.listaCotizaciones.splice(idControl, 1);
        if (this.listaCotizaciones.length == 0) {
          this.cotizacion = true;
        }
      })
  }

}
