import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../interfaces/dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  dashboardService = inject(DashboardService);
  dashboard = signal<Dashboard | null>(null);
  loading = signal(true);

  // Gráfico - Usamos computed para reactividad automática
  public barChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const data = this.dashboard();
    if (!data) return this.getEmptyChartData();

    return {
      labels: data.rendimientoPorProveedor.map(p => p.nombre),
      datasets: [
        {
          data: data.rendimientoPorProveedor.map(p => p.rendimiento),
          label: 'Rendimiento por Proveedor (%)',
          backgroundColor: this.generateBackgroundColors(data.rendimientoPorProveedor.length),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  });

  // Opciones del gráfico (mejoradas para tu caso)
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Proveedores',
        },
      },
      y: {
        min: 80,  // Ajuste para mejor visualización de porcentajes
        max: 100,
        title: {
          display: true,
          text: 'Rendimiento (%)',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}%` // Muestra el símbolo % en tooltips
        }
      }
    }
  };

  public barChartType: 'bar' = 'bar';

  ngOnInit(): void {
    this.dashboardData();
  }

  dashboardData() {
    this.loading.set(true);
    this.dashboardService.dashboardData().subscribe({
      next: (data) => {
        this.dashboard.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar datos del dashboard:', error);
        this.loading.set(false);
      }
    });
  }

  // Helper para datos vacíos
  private getEmptyChartData(): ChartConfiguration<'bar'>['data'] {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Cargando datos...',
          backgroundColor: 'rgba(200, 200, 200, 0.2)',
          borderWidth: 0
        }
      ]
    };
  }

  // Genera colores dinámicamente
  private generateBackgroundColors(count: number): string[] {
    const colors = [
      'rgba(75, 192, 192, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(153, 102, 255, 0.6)'
    ];
    return colors.slice(0, count);
  }
}