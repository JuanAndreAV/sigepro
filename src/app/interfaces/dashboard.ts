export interface Dashboard {
    rendimientoPromedioGeneral: string;
    totalLotes: number;
    totalProveedores: number;
    rendimientoPorProveedor: RendimientoPorProveedor[];
}    

export interface RendimientoPorProveedor {
    nombre:      string;
    rendimiento: string;
}



