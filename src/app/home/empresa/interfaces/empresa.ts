export interface Categoria {
    id: string;
    descripcion: string;
}

export interface Empresa {
    id: string;
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
    imagen_logo: string;
    imagen_fondo: string;
    mensaje?: string;
}

export interface Cotizacion {
    id: number;
    empresa: string;
    cliente: string;
    correo_cliente: string;
    telefono_cliente: string;
    solicitud_cliente: string;
    fecha_solicitud?: string;
    desicion?: string;
    mensaje?: string;
}

export interface Cotizar {
    id: number;
    empresa: string;
    cliente: string;
    correo_cliente: string;
    telefono_cliente: string;
    solicitud_cliente: string;
}

export interface Referencia {
    id: number;
    empresa: string;
    descripcion: string;
}

export interface ContarCotizacion {
    empresa: number;
    cantidad: number;
}

export interface ResolverCotizacion {
    id: number;
    decision: string;
}
