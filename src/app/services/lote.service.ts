import { computed, inject, Injectable, signal } from '@angular/core';
import { CreateLoteDTO, Lote } from '../interfaces/lote';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
 lotes = signal<CreateLoteDTO[]>([]);
 //updatedLotes = computed(()=>  this.lotes())
 http = inject(HttpClient);
 private apiUrl = 'http://localhost:3000/lotes';

  // createLote(lote: CreateLoteDTO){
  //   this.lotes.update((producto)=> [...producto,lote])
  // }
  createLote(lote: Lote){
    return this.http.post<Lote>(`${this.apiUrl}`, lote);
  }
 
}
