import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, Subject } from 'rxjs';

import { EmpresaService } from '../../services/empresa.service';
import { Categoria } from '../../interfaces/empresa';

@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styles: [
    `
    ul{
      cursor:pointer
    }
    `
  ]
})
export class RegistrarEmpresaComponent implements OnInit {

  public archivos: any = [];
  public previsualizacionLogo: string = '';
  public previsualizacionFondo: string = '';

  categorias: Categoria[] = [];
  termino: string = '';
  verBarra: boolean = false;
  hayError: boolean = false;

  debouncer: Subject<string> = new Subject();

  formularioEmpresa: FormGroup = this.fb.group({
    rut: ['1-6'],
    nombre_fantasia: ['Krosty'],
    prueba: ['b'],
    comuna: ['1'],
    direccion: ['la vendimia 2344'],
    telefono: ['895465455'],
    titulo_descripcion: ['Quienes Somos'],
    correo: ['emzero1@gmail.com'],
    linkedin: ['https://www.linkedin.com'],
    twitter: ['https://www.twitter.com'],
    facebook: ['https://www.facebook.com'],
    instagram: ['https://www.instagram.com'],
    whatsapp: ['+56988877766'],
    categoria: [''],
    descripcion: ['esto es una prueba'],
    imagen_logo: [''],
    imagen_fondo: [''],
  })

  constructor(private eService: EmpresaService, private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.buscarCategoria();
      })
  }

  teclaPresionada(event: any) {
    const { prueba } = this.formularioEmpresa.value;
    this.debouncer.next(prueba);
  }

  buscarCategoria() {
    this.hayError = false;
    const { prueba } = this.formularioEmpresa.value;
    if (prueba.length === 0) { this.verBarra = false; this.formularioEmpresa.value.categoria = ''; return }

    return this.eService.mostrarCategoria(prueba)
      .subscribe(resp => {
        if (resp !== null) {
          if (resp[0].descripcion === prueba) {
            this.categorias = [];
            return;
          }
          this.categorias = resp.splice(0, 10);
          this.verBarra = true;
        } else {
          this.hayError = true;
          this.categorias = [];
          this.verBarra = false;
          this.termino = prueba;

        }
      })
  }

  guardarRegistro() {
    this.formularioEmpresa.value.imagen_logo = this.previsualizacionLogo;
    this.formularioEmpresa.value.imagen_fondo = this.previsualizacionFondo;
    console.log(this.formularioEmpresa.value.imagen_fondo);
    this.eService.registrarEmpresa(this.formularioEmpresa.value).subscribe(resp => console.log(resp))

  }

  capturarLogo(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      console.log(imagen);
      this.previsualizacionLogo = imagen.base;
      this.formularioEmpresa.value.imagen_logo = imagen.base;
    })
  }

  capturarFondo(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      console.log(imagen);
      this.previsualizacionFondo = imagen.base;
      this.formularioEmpresa.value.imagen_fondo = imagen.base;
    })
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return;
    }
  })

}
