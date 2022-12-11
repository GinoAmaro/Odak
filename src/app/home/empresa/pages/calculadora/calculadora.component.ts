import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { Indicadores } from '../../interfaces/indicadores';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styles: [
  ]
})
export class CalculadoraComponent implements OnInit {

  indicadores: Indicadores = {
    dolar: { valor: 0 },
    euro: { valor: 0 },
    bitcoin: { valor: 0 },
    uf: { valor: 0 },
    utm: { valor: 0 },
    ipc: { valor: 0 },
    ivp: { valor: 0 },
    imacec: { valor: 0 }
  }

  valor: number = 0;
  boletaMasRetencion: number = 0;
  boletaRetencionIncluida: number = 0;
  ivaIncluido: number = 0;
  masIva: number = 0;
  porcentaje: number = 12.25;
  iva: number = 1.19;

  conversionDolar: number = 0;
  conversionEuro: number = 0;
  conversionUf: number = 0;
  conversionUtm: number = 0;

  constructor(private eService: EmpresaService) { }

  ngOnInit(): void {
    this.eService.idicadoresEconomicos()
      .subscribe(resp => this.indicadores = resp);
  }

  cambio() {
    const valor = this.valor;

    this.boletaRetencionIncluida = (valor - (valor / 100 * this.porcentaje));
    this.boletaMasRetencion = (valor / (1 - (1 / 100 * this.porcentaje)));
    this.ivaIncluido = (valor / this.iva);
    this.masIva = (valor * this.iva);

    this.conversionDolar = (valor / this.indicadores.dolar.valor);
    this.conversionEuro = (valor / this.indicadores.euro.valor);
    this.conversionUf = (valor / this.indicadores.uf.valor);
    this.conversionUtm = (valor / this.indicadores.utm.valor);
    


  }



}