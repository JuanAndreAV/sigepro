import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoteService } from '../../services/lote.service';

@Component({
  selector: 'app-lotes-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lotes-list.component.html',
  styleUrl: './lotes-list.component.css'
})
export class LotesListComponent implements OnInit  {
  loteService = inject(LoteService);
  ngOnInit(): void {
      console.log(this.loteService.lotes())
  }

}
