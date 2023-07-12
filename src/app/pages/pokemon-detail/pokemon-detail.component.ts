import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
})
export class PokemonDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  // id: WritableSignal<number|null> = signal(null);
  // pokemon: Signal<Pokemon|null> = computed(() => {
  //   this.id()
  //   if(this.id() !== null) {
  //     return this.pokemonService.getPokemonById(this.id() ?? 0).subscribe((poke: Pokemon) => poke)
  //     // return pokemon1
  //   }

  //   return null
  // })

  // ! test, no subscribe
  // pokemon: Observable<Pokemon> = this.route.params.pipe(
  //   map((params) => +params['id']),
  //   map((id: number) => {
  //     return this.pokemonService.getPokemonById(id)
  //   }),
  // )

  // boring solution
  pokemonId: number = 1;
  pokemonData!: Observable<Pokemon>;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.pokemonId = +params['id'];
      this.getPokemonData();
    });
  }

  getPokemonData() {
    this.pokemonData = this.pokemonService.getPokemonById(this.pokemonId);
  }
}
