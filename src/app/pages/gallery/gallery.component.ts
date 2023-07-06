import { Component, OnInit, inject } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  private pokemonService = inject(PokemonService)
  
  ngOnInit(): void {
    this.pokemonService.getPokemons();
  }

  public onIntersected() {
    this.pokemonService.getPokemons(
      this.pokemonService.pokemonsHttp.value?.next
    );
  }
}
