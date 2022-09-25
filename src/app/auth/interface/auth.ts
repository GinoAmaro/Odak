export interface Usuario {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    contrasena: string;
    empresa: string;
    tipo: string;
    estado: boolean;
    token: string;
}

export interface Login {
    id: string;
    nombre: string;
    apellidos: string;
    correo: string;
    token: string;
}
