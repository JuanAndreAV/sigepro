import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoteService } from '../../services/lote.service';
import { CommonModule } from '@angular/common';
import { loteResponse } from '../../interfaces/lote';

@Component({
  selector: 'app-lotes-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lotes-list.component.html',
  styleUrl: './lotes-list.component.css'
})
export class LotesListComponent implements OnInit  {
  loteService = inject(LoteService);
  lotes = signal<loteResponse[]>([]);

  ngOnInit(): void {
    this.cargarLotes();
      //console.log(this.loteService.lotes())
  };
  cargarLotes(){
    this.loteService.verLotes()
    .subscribe({
      next: (data)=>{
        this.lotes.update(()=>Array.isArray(data) ? data : [data]);
      },
      error: (error)=>{
        alert(`Error al cargar los datos: ${error.error}`);
      }
    })
  }

}
