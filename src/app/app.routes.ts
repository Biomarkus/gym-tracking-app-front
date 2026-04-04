import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sessions',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'sessions',
    pathMatch: 'full',
  },
  {
    path: 'sessions/:sessionId/edit',
    loadComponent: () =>
      import('./session/session.page').then(
        m => m.SessionPage
      ),
  },
  {
    path: 'sessions/new',
    loadComponent: () => import('./new-session/new-session.page').then( m => m.NewSessionPage)
  },
];
