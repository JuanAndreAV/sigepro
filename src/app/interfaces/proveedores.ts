export interface Proveedores {
    nombre: string;
    contactoNombre?: string;
    telefono?: string;
    email?: string
}
export interface ProveedoresList {
    id: number;
    nombre: string;
    contactoNombre?: string | null;
    telefono?: string | null;
    email?: string | null;
    creadoEn: Date
}

       