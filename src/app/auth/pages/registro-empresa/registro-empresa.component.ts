import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styles: [
  ]
})
export class RegistroEmpresaComponent implements OnInit {

  formularioRegistro:FormGroup=this.fb.group({
    
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  registrar(){

  }

}
