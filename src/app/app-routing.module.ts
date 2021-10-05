import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {IntroGuard} from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then( m => m.MoviesPageModule)
  },
  {
    path: '',
    redirectTo: 'menu/search',
    pathMatch: 'full'
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./pages/movie-details/movie-details.module').then( m => m.MovieDetailsPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
