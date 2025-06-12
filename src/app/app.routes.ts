import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LotEntryFormComponent } from './pages/lot-entry-form/lot-entry-form.component';


export const routes: Routes = [
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
            }

        ]
    },
    {
        path: "**",
        redirectTo: "dashboard/home"
    }
];
