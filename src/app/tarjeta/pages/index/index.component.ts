import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../home/empresa/services/empresa.service';
import { Empresa } from '../../../home/empresa/interfaces/empresa';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
    `
    .prueba{
      cursor:pointer;
    }
    `
  ]
})
export class IndexComponent implements OnInit {

  empresa: Empresa[] = [];

  constructor(private eService: EmpresaService) { }

  ngOnInit(): void {
    this.eService.landingEmpresa()
      .subscribe(resp => {
        this.empresa = resp;
        console.log(this.empresa);
        
      })

  }

}
