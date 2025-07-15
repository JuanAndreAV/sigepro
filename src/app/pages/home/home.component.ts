import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../interfaces/dashboard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 dashboardService = inject(DashboardService);
 dashboard = signal<Dashboard | null>(null);
 loading = signal(true);

 ngOnInit(): void {
   
      this.dashboardData();
  };
  dashboardData(){
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
}
