import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LotEntryFormComponent } from './pages/lot-entry-form/lot-entry-form.component';
import { LotesListComponent } from './pages/lotes-list/lotes-list.component';
import { LotProcessFormComponent } from './pages/lot-process-form/lot-process-form.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { GestionProductosComponent } from './pages/gestion-productos/gestion-productos.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'reports',
                component: ReportsComponent
            },
            {
                path: 'entry',
                component: LotEntryFormComponent
            },
            {
                path: 'lotes-list',
                component: LotesListComponent
            },
            {
                path: 'process',
                component: LotProcessFormComponent
            },
            {
                path: 'proveedores',
                component: ProveedoresComponent
            },
            {
                path: 'gestion-productos',
                component: GestionProductosComponent
            }

        ]
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
