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
    path: 'pet/chat/:id',
    loadComponent: () => import('./chats/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'pet/contact/:id',
    loadComponent: () => import('./pet/contact/contact.page').then( m => m.ContactPage)
  },
];
