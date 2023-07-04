import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';
import { testPokemonHttp } from '../../../data/collection';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];

  ngOnInit(): void {
    this.pokemonList = testPokemonHttp.results;
  }
}
