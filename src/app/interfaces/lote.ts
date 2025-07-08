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
export interface loteResponse {
  id:               number;
  fechaIngreso:     Date;
  pesoIngresoKg:    string;
  precioPorKg:      string;
  loteProveedorRef: string | null;
  estado:           string;
  creadoEn:         Date;
  procesamiento:    Procesamiento | null;
  proveedor:        Proveedor;
  producto:         Producto;
  usuarioRegistro:  UsuarioRegistro;
}

export interface Producto {
  id:             number;
  nombreProducto: string;
  descripcion:    string;
  mermasConfig:   string[];
  creadoEn:       Date;
}

export interface Proveedor {
  id:             number;
  nombre:         string;
  contactoNombre: string;
  telefono:       string;
  email:          string;
  creadoEn:       Date;
}

export interface UsuarioRegistro {
  id:             number;
  nombreCompleto: string;
  email:          string;
  passwordHash:   string;
  rol:            string;
  creadoEn:       Date;
}

export interface Procesamiento {
  id: number;
  fechaProcesamiento: string;
  mermasDetalle: Record<string, number>;
  pesoNetoFinalKg: string;
  rendimientoCalculado: string;
  // ... otros campos de procesamiento
}