import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  http = inject(HttpClient);
  url = 'http://localhost:3000/dashboard';

  dashboardData(){
    return this.http.get<Dashboard>(this.url);
  }
  
}
