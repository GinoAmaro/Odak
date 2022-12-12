import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  idEmpresa: number = 0;
  cantidadCotizacion: number = 0;

  constructor(private eService: EmpresaService, private authService: AuthService) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    this.authService.validarToken(token!)
      .subscribe(resp => {
        this.idEmpresa = resp[0]['empresa'];
        
        this.eService.contarCotizacion(this.idEmpresa)
          .subscribe(resp => {
            this.cantidadCotizacion = resp[0]['cantidad'];
          })
      })

  }

}
