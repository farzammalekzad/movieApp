import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'games',
        loadChildren: () => import('../../pages/games/games.module').then( m => m.GamesPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../../pages/search/search.module').then( m => m.SearchPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
