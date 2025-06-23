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
  },
  {
    id: 4,
    path: '/dashboard/lotes-list',
    title: 'Gestión de Lotes',
    icon: 'list',
  },
  {
    id: 5,
    path: '/dashboard/gestion-productos',
    title: 'Gestión de Productos',
    icon: 'product',
  },
  {
    id: 6,
    path: '/dashboard/proveedores',
    title: 'Proveedores',
    icon: 'lot-entry',
  }
 ]
}
