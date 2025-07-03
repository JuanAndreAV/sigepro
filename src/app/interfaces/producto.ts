export interface Producto {
    nombreProducto: string;
    descripcion?: string;
    mermasConfig?: string[]
}
 export interface Productos {
    id:             number;
    nombreProducto: string;
    descripcion?:    string;
    mermasConfig?:   string[];
    creadoEn:       Date;
}
