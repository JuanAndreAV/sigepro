import { computed, inject, Injectable, signal } from '@angular/core';
import { loteResponse, Lote } from '../interfaces/lote';
import { HttpClient } from '@angular/common/http';
import { CreateProcesamientoDto, Procesamiento } from '../interfaces/procesamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
 //lotes = signal<CreateLoteDTO[]>([]);
 //updatedLotes = computed(()=>  this.lotes())
 http = inject(HttpClient);
 private apiUrl = 'http://localhost:3000';

  // createLote(lote: CreateLoteDTO){
  //   this.lotes.update((producto)=> [...producto,lote])
  // }
  createLote(lote: Lote){
    return this.http.post<Lote>(`${this.apiUrl}/lotes`, lote);
  };
  verLotes(){
    return this.http.get<loteResponse>(`${this.apiUrl}/lotes`);
  };
  getLoteById(id: number){
    return this.http.get<loteResponse>(`${this.apiUrl}/lotes/${id}`);
  };
   procesarLote(loteId: number, data: CreateProcesamientoDto): Observable<any> {
    const url = `${this.apiUrl}/lotes/${loteId}/procesar`;
    return this.http.post(url, data);
  };
   getProcesamientos(): Observable<Procesamiento[]> {
    return this.http.get<Procesamiento[]>(`${this.apiUrl}/procesamiento`);
  }
 
}
