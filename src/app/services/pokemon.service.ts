import { Injectable, OnInit } from '@angular/core';
import {
  Pokemon,
  PokemonsCall,
  PokemonsHttp,
} from '../interfaces/pokemon.interfaces';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonPrefix = 'https://pokeapi.co/api/v2/pokemon';
  pokemonsHttp = new BehaviorSubject<PokemonsHttp | null>(null);
  // todo: https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject

  constructor(private http: HttpClient) {}

  getPokemons(url?: string, offset?: number, limit?: number) {
    let pokeUrl: string = this.pokemonPrefix;

    // setting the pokeUrl
    if (url === undefined) {
      if (offset === undefined || limit === undefined) {
        pokeUrl = pokeUrl + '?offset=0&limit=0';
      } else {
        pokeUrl = pokeUrl + `?offset=${offset}&limit=${limit}`;
      }
    } else {
      pokeUrl = url;
    }

    // meat
    this.http
      .get<PokemonsCall>(pokeUrl)
      .pipe(
        catchError(
          this.handleError<PokemonsCall>(
            `gePokemons offset=${offset} limit=${limit}`
          )
        ),

        switchMap((data) => {
          const pokeOb = data.results.map((poke) =>
            this.getPokemonByUrl(poke.url)
          );

          let currentPokis = this.pokemonsHttp.value?.results
            ? this.pokemonsHttp.value?.results
            : [];

          return forkJoin(pokeOb).pipe(
            map((pokemonData) => ({
              count: data.count,
              next: data.next,
              previous: data.previous,
              results: [...currentPokis, ...pokemonData],
            }))
          );
        }),

        map((data) => {
          this.pokemonsHttp.next(data);
          return data;
        })
      )
      .subscribe(console.log);
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokemonPrefix}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      // clean up function
      catchError(this.handleError<Pokemon>(`gePokemonByID id=${id}`))
    );
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
      // clean up function
      catchError(this.handleError<Pokemon>(`gePokemonByUrl url=${url}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
