import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';
import { testPokemonHttp } from '../../../data/collection';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // this.pokemonList = testPokemonHttp.results;
    this.pokemonService.pokemonsHttp.subscribe(newPokis => {
      this.pokemonList = newPokis.results
    })
  }
}
