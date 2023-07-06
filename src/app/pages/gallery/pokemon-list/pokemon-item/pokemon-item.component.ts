import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent {
  @Input("pokemonData") pokemon!: Pokemon

  constructor(){
    console.log("hey")
  }

  onIntersected3() {
    console.log(this.pokemon.name + " intercepted")
  }
}
