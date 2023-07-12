import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage]
})
export class PokemonItemComponent {
  @Input("pokemonData") pokemon!: Pokemon
}
