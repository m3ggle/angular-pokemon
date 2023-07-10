import { Component, OnInit, inject } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  public pokemonList: Pokemon[] = [];
  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.pokemonService.pokemonsHttp.subscribe((newPokis) => {
      if (newPokis !== null) {
        this.pokemonList = newPokis.results;
      }
    });
  }
}
