import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/movies/movies.routes').then((m) => m.moviesRoutes),
  },
  {
    path: '**',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
];