import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pet/info/:petId',
    loadComponent: () => import('./pet/pet-info/pet-info.component').then((m) => m.PetInfoComponent),
  }
];
