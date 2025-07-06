export interface CreateLoteDTO {
    proveedorId: number;
    productoId: number;
    usuarioRegistroId: number;
    fechaIngreso: string; // Formato 'YYYY-MM-DD'
    pesoIngresoKg: number;
    precioPorKg: number;
    loteProveedorRef?: string; // Opcional
}


export interface Lote {
  fechaIngreso: string;
  pesoIngresoKg: number;
  precioPorKg: number;
  loteProveedorRef?: string;
  estado: 'Pendiente de Procesar' | 'Finalizado';
  creadoEn?: Date;
  proveedorId: number;  // Cambiado de objeto a number
  productoId: number;   // Cambiado de objeto a number
  usuarioRegistroId: number; // Cambiado de objeto a number
}
