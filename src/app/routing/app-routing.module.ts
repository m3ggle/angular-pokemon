import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gallery',
    pathMatch: 'full',
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('../pages/gallery/gallery.component').then(
        (m) => m.GalleryComponent
      ),
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('../pages/pokemon-detail/pokemon-detail.module').then(
        (m) => m.PokemonDetailModule
      ),
  },
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
