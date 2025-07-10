import { computed, inject, Injectable, signal } from '@angular/core';
import { loteResponse, Lote } from '../interfaces/lote';
import { HttpClient } from '@angular/common/http';
import { CreateProcesamientoDto } from '../interfaces/procesamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
 //lotes = signal<CreateLoteDTO[]>([]);
 //updatedLotes = computed(()=>  this.lotes())
 http = inject(HttpClient);
 private apiUrl = 'http://localhost:3000/lotes';

  // createLote(lote: CreateLoteDTO){
  //   this.lotes.update((producto)=> [...producto,lote])
  // }
  createLote(lote: Lote){
    return this.http.post<Lote>(`${this.apiUrl}`, lote);
  };
  verLotes(){
    return this.http.get<loteResponse>(this.apiUrl);
  };
  getLoteById(id: number){
    return this.http.get<loteResponse>(`${this.apiUrl}/${id}`);
  };
   procesarLote(loteId: number, data: CreateProcesamientoDto): Observable<any> {
    const url = `${this.apiUrl}/${loteId}/procesar`;
    return this.http.post(url, data);
  };
 
}
