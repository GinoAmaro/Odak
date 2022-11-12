export interface Categoria {
    id: string;
    descripcion: string;
}

export interface Empresa {
    id:string;
    rut: string;
    nombre_fantasia: string;
    categoria: string;
    comuna: string;
    direccion: string;
    telefono: string;
    correo: string;
    titulo_descripcion: string;
    descripcion: string;
    twitter: string;
    facebook: string;
    whatsapp: string;
    instagram: string;
    linkedin: string;
    prueba: string;
    imagen_logo: string,
    imagen_fondo: string,
    mensaje?: string
}

export interface Cotizacion{
    empresa:string;
    cliente:string;
    correo_cliente:string;
    telefono_cliente:string;
    solicitud_cliente:string;
}

export interface Grilla {
    id:string;
    nombre_fantasia: string;
    imagen_logo: string,
}
