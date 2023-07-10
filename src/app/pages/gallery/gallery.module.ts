import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { BackToTopModule } from 'src/app/generalComponents/back-to-top/back-to-top.module';
import { SearchModule } from 'src/app/generalComponents/search/search.module';
import { PokemonListModule } from './pokemon-list/pokemon-list.module';
import { IntersectionModule } from 'src/app/directives/intersection/intersection.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    SearchModule,
    PokemonListModule,
    BackToTopModule,
    IntersectionModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: GalleryComponent,
      },
    ]),
  ],
  exports: [GalleryComponent],
})
export class GalleryModule {}
