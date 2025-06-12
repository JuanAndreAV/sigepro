import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 routes = [
  {
    id: 1,
    path: '/dashboard/home',
    title: 'Dashboard',
    icon: 'dashboard',

  },
  {
    id: 2,
    path: '/dashboard/entry',
    title: 'Nuevo Lote',
    icon: 'entry',
  },
  {
    id: 3,
    path: '/dashboard/reports',
    title: 'Reportes',
    icon: 'report',
  }
 ]
}
