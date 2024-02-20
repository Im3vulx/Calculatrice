import { Routes } from '@angular/router';

export const routes: Routes = [{
    path : "calculette",
    loadComponent : () => import('./calulette/calulette.component').then(c => c.CaluletteComponent)
}
];
