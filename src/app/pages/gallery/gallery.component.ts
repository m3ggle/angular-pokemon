import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IntersectionModule } from 'src/app/directives/intersection/intersection.module';
import { BackToTopComponent } from 'src/app/generalComponents/back-to-top/back-to-top.component';
import { SearchComponent } from 'src/app/generalComponents/search/search.component';
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
export class GalleryComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.pokemonService.getPokemons();
  }

  public onIntersected() {
    this.pokemonService.getPokemons(
      this.pokemonService.pokemonsHttp.value?.next
    );
  }
}
