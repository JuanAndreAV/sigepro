import { Component, inject, OnInit, signal } from '@angular/core';
import { LoteService } from '../../services/lote.service';
import { CommonModule, NgClass } from '@angular/common';
import { Procesamiento } from '../../interfaces/procesamiento';

import { RouterModule } from '@angular/router';
interface MermaItem {
  nombre: string;
  valor: number;
}
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
 loteService = inject(LoteService);
 procesamientos = signal<Procesamiento[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  hoveredProcesamientoId: number | null = null;

  // Paginación
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;

ngOnInit(): void {
    this.loadProcesamientos();
    
  }

  loadProcesamientos(): void {
    this.loading.set(true);
    this.error.set(null);

    this.loteService.getProcesamientos().subscribe({
      next: (data) => {
        this.procesamientos.set(data);
        this.totalItems = data.length;
        this.loading.set(false);
        console.log(this.procesamientos())
      },
      error: (err) => {
        console.error('Error al cargar procesamientos:', err);
        this.error.set('Error al cargar los procesamientos. Intente nuevamente.');
        this.loading.set(false);
      }
    });
  }

  getMermasArray(mermasDetalle: { [key: string]: number }): MermaItem[] {
    return Object.entries(mermasDetalle || {}).map(([nombre, valor]) => ({
      nombre,
      valor
    }));
  }
  showDetails(id: number): void {
  this.hoveredProcesamientoId = id;
}

hideDetails(): void {
  this.hoveredProcesamientoId = null;
}

getTotalMermas(mermasDetalle: { [key: string]: number }): number {
  return Object.values(mermasDetalle).reduce((sum, current) => sum + current, 0);
}


  // Navegación de paginación
  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.totalItems) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Opcional: Método para formatear fecha
  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }
}
