import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styles: [
  ]
})
export class RegistroEmpresaComponent implements OnInit {

  categorias: any[] = []

  formularioRegistro: FormGroup = this.fb.group({
    categoria: ['']
  })

  debouncer: Subject<string> = new Subject();

  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
  }



}
