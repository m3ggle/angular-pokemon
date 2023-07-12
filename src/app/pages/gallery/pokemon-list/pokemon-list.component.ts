import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  standalone: true,
  imports: [CommonModule, PokemonItemComponent]
})
export class PokemonListComponent {
  private pokemonService = inject(PokemonService);
  public pokemonList: Observable<Pokemon[] | undefined> = this.pokemonService.pokemonsHttp;
}
