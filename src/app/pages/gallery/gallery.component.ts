import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BackToTopComponent } from 'src/app/components/back-to-top/back-to-top.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { IntersectionModule } from 'src/app/directives/intersection/intersection.module';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    BackToTopComponent,
    PokemonListComponent,
    IntersectionModule,
  ],
})
export class GalleryComponent {
  private pokemonService = inject(PokemonService);
  public onIntersected() {
    this.pokemonService.fetchNextPokemons();
  }
}
