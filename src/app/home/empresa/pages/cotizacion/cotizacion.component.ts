import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Cotizacion } from '../../interfaces/empresa';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styles: [
  ]
})
export class CotizacionComponent implements OnInit {

  listaCotizaciones: Cotizacion[] = [];
  idEmpresa: number = 0;
  cotizacion: boolean = true;

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

      })
  }


  aceptarCotizacion(id: number, idControl: number) {
    const decision: string = 'Aceptada';

    this.eService.resolverCotizacion({ id, decision })
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
