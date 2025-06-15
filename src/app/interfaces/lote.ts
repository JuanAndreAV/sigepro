export interface CreateLoteDTO {
    proveedor: number;
    producto: number;
    fecha: string; // Formato 'YYYY-MM-DD'
    peso: number;
    precio: number;
    factura: number;
    loteProveedorRef?: string; // Opcional
}

export interface Lote {
  id: number;
  proveedorId: number;
  productoId: number;
  fechaIngreso: string;
  pesoIngresoKg: number;
  precioPorKg: number;
  loteProveedorRef?: string;
  estado: 'Pendiente de Procesar' | 'Finalizado';
  creadoEn: string;
}
