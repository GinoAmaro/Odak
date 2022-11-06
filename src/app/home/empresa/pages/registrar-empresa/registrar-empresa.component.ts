import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, Subject } from 'rxjs';

import { EmpresaService } from '../../services/empresa.service';
import { Categoria } from '../../interfaces/empresa';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-empresa',
  templateUrl: './registrar-empresa.component.html',
  styles: [
    `
    ul{
      cursor:pointer
    }
    button:hover {
    transform: scale(1.09);
    animation-duration: 8s;
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
    id: [''],
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

  constructor(private eService: EmpresaService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.buscarCategoria();
      })

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.eService.consultarParaEditar(id)))
      .subscribe(empresa => {
        this.formularioEmpresa.setValue({
          id: empresa[0]['id'],
          rut: empresa[0]['rut'],
          nombre_fantasia: empresa[0]['nombre_fantasia'],
          prueba: [''],
          comuna: empresa[0]['comuna'],
          direccion: empresa[0]['direccion'],
          telefono: empresa[0]['telefono'],
          titulo_descripcion: empresa[0]['titulo_descripcion'],
          correo: empresa[0]['correo'],
          linkedin: empresa[0]['linkedin'],
          twitter: empresa[0]['twitter'],
          facebook: empresa[0]['facebook'],
          instagram: empresa[0]['instagram'],
          whatsapp: empresa[0]['whatsapp'],
          categoria: empresa[0]['categoria'],
          descripcion: empresa[0]['descripcion'],
          imagen_logo: empresa[0]['imagen_logo'],
          imagen_fondo: empresa[0]['imagen_fondo'],
        })
        this.previsualizacionLogo = empresa[0]['imagen_logo'];
        this.previsualizacionFondo = empresa[0]['imagen_fondo']
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
    const nombre = this.formularioEmpresa.value.nombre_fantasia;
    Swal.fire({
      title: '¿Guardar Datos?',
      imageUrl: '../../../assets/img/login/pregunta.svg',
      imageHeight: '100',
      footer: '<b>ODAK</b>&nbsp ' + nombre,
      showCancelButton: true,
      confirmButtonColor: '#2f3e46',
      cancelButtonColor: '#84a98c',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigateByUrl('home/empresa');
        this.eService.registrarEmpresa(this.formularioEmpresa.value).subscribe(resp => {
          Swal.fire({
            title: resp.mensaje,
            imageUrl: '../../../assets/img/login/rayo-de-risa.svg',
            imageHeight: '100',
            footer: ' <b>ODAK</b>&nbsp' + nombre,
            timer: 2500,
            showConfirmButton: false
          })
        })
      }
    })
  }

  actualizarRegistro() {
    const nombre = this.formularioEmpresa.value.nombre_fantasia;
    Swal.fire({
      title: '¿Confirmar cambios?',
      imageUrl: '../../../assets/img/login/pregunta.svg',
      imageHeight: '100',
      footer: '<b>ODAK</b>&nbsp ' + nombre,
      showCancelButton: true,
      confirmButtonColor: '#2f3e46',
      cancelButtonColor: '#84a98c',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigateByUrl('home/empresa');
        this.eService.actualizarEmpresa(this.formularioEmpresa.value).subscribe(resp => {
          Swal.fire({
            title: resp.mensaje,
            imageUrl: '../../../assets/img/login/rayo-de-risa.svg',
            imageHeight: '100',
            footer: ' <b>ODAK</b>&nbsp' + nombre,
            timer: 2500,
            showConfirmButton: false
          })
        })
      }
    })
  }

  capturarLogo(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacionLogo = imagen.base;
      this.formularioEmpresa.value.imagen_logo = imagen.base;
    })
  }

  capturarFondo(event: any) {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
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

  enviarDatos() {
    if (this.formularioEmpresa.value.id.trim().length === 0) {
      this.guardarRegistro();
    } else {
      this.actualizarRegistro();
    }
    return;
  }

}
