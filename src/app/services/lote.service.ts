import { computed, Injectable, signal } from '@angular/core';
import { CreateLoteDTO, Lote } from '../interfaces/lote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
 lotes = signal<CreateLoteDTO[]>([]);
 //updatedLotes = computed(()=>  this.lotes())

  createLote(lote: CreateLoteDTO){
    this.lotes.update((producto)=> [...producto,lote])
  }

 
}
