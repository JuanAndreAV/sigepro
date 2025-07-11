import { loteResponse } from "./lote";

export interface CreateProcesamientoDto {
  mermasDetalle: Record<string, number>;
  usuarioProcesoId: number;
  lote: object | null

}
export interface Procesamiento {
  id: number;
  fechaProcesamiento: string;
  mermasDetalle: { [key: string]: number };
  pesoNetoFinalKg: string;
  rendimientoCalculado: string;
  creadoEn: string;
  lote?: loteResponse | null,
  

  // Agrega otras propiedades si es necesario
}
