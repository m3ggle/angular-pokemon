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
    loadComponent: () =>
      import('../pages/pokemon-detail/pokemon-detail.component').then(
        (m) => m.PokemonDetailComponent
      ),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('../pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
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
