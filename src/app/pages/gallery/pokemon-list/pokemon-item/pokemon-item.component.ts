import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
})
export class PokemonItemComponent {
  @Input("pokemonData") pokemon!: Pokemon
}
