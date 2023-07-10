import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { GalleryComponent } from '../pages/gallery/gallery.component';
// import { PokemonDetailComponent } from '../pages/pokemon-detail/pokemon-detail.component';
// import { NotFoundComponent } from '../pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full',
  },
  // {
  //   path: 'gallery',
  //   component: GalleryComponent,
  // },
  {
    path: 'gallery',
    loadChildren: () =>
      import('../pages/gallery/gallery.module').then((m) => m.GalleryModule),
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('../pages/pokemon-detail/pokemon-detail.module').then(
        (m) => m.PokemonDetailModule
      ),
  },
  // {
  //   path: 'pokemon',
  //   component: PokemonDetailComponent,
  //   children: [
  //     {
  //       path: ':id',
  //       component: PokemonDetailComponent,
  //     },
  //   ],
  // },
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent,
  // },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
