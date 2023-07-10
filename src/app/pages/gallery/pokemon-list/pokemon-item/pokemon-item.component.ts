import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LazyLoadImageModule } from 'src/app/directives/lazy-load-image/lazy-load-image.module';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  standalone: true,
  imports: [CommonModule, LazyLoadImageModule, RouterLink]
})
export class PokemonItemComponent {
  @Input("pokemonData") pokemon!: Pokemon
}
