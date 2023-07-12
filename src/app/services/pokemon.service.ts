// import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import {
  Pokemon,
  PokemonsCall,
  PokemonsHttp,
} from '../interfaces/pokemon.interfaces';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly pokemonPrefix = 'https://pokeapi.co/api/v2/pokemon';
  // private http = inject(HttpClient);
  private cacheService = inject(CacheService);

  public pokemonsHttp = new BehaviorSubject<PokemonsHttp | null>(null);

  public getPokemons(url?: string, offset?: number, limit?: number) {
    // console.log("ha")
    const pokeUrl = this.determineUrl(url, offset, limit);

    // meat of getting pokemons
    // this.http
    //   .get<PokemonsCall>(pokeUrl)
    this.cacheService
      .httpWithCache<PokemonsCall>(pokeUrl)
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

  private determineUrl(url?: string, offset?: number, limit?: number) {
    let pokeUrl = this.pokemonPrefix;
    if (url === undefined) {
      if (offset === undefined || limit === undefined) {
        pokeUrl = pokeUrl + '?offset=0&limit=0';
      } else {
        pokeUrl = pokeUrl + `?offset=${offset}&limit=${limit}`;
      }
    } else {
      pokeUrl = url;
    }

    return pokeUrl;
  }

  public getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokemonPrefix}/${id}/`;
    // return this.http.get<Pokemon>(url).pipe(
    return this.cacheService.httpWithCache<Pokemon>(url).pipe(
      // clean up function
      catchError(this.handleError<Pokemon>(`gePokemonByID id=${id}`))
    );
  }

  public getPokemonByUrl(url: string): Observable<Pokemon> {
    // return this.http.get<Pokemon>(url).pipe(
    return this.cacheService.httpWithCache<Pokemon>(url).pipe(
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
