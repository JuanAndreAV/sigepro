import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
year = new Date().getFullYear();

 routes = [
  {
    id: 1,
    path: '/dashboard/home',
    title: 'Dashboard',
    icon: 'fa-solid fa-table-columns',

  },
  {
    id: 2,
    path: '/dashboard/entry',
    title: 'Nuevo Lote',
    icon: 'fa-regular fa-industry',
  },
  {
    id: 3,
    path: '/dashboard/reports',
    title: 'Reportes',
    icon: 'fa-solid fa-chart-bar',
  },
  {
    id: 4,
    path: '/dashboard/lotes-list',
    title: 'Gestión de Lotes',
    icon: 'fa-solid fa-list-check',
  },
  {
    id: 5,
    path: '/dashboard/gestion-productos',
    title: 'Gestión de Productos',
    icon: 'fa-solid fa-bacon',
  },
  {
    id: 6,
    path: '/dashboard/proveedores',
    title: 'Proveedores',
    icon: 'fa-solid fa-truck-fast',
  }
 ]
}
