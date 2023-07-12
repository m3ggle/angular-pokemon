// import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  forkJoin,
  map,
  mergeMap,
  of,
  scan,
  shareReplay,
  switchMap,
} from 'rxjs';
import {
  Pokemon,
  PokemonsCall,
  PokemonsHttp,
} from '../interfaces/pokemon.interfaces';
import { CacheService } from './cache.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly pokemonPrefix = 'https://pokeapi.co/api/v2/pokemon';
  private http = inject(HttpClient);

  private url$$ = new Subject<string>();
  private nextUrl?: string;

  public url$ = this.url$$.asObservable();
  // Create an observable that depends on URL changes
  public pokemonsHttp = this.url$$.pipe(
    // if the URL is updated (see `fetchNextPokemons`)
    // then we want to fetch the new URL.
    mergeMap(url => {
      // meat of getting pokemons
    return this.http
      .get<PokemonsCall>(url)
      .pipe(
        // The response contains a bunch of Pokemon Detail URLs
        // that we need to fetch now
        mergeMap((data) => {
          // create a list of observables where each observable
          // makes one http request to a specific pokemon
          const pokeOb = data.results.map((poke) =>
            this.getPokemonByUrl(poke.url)
          );
          // remember the next URL for `fetchNextPokemons`
          this.nextUrl = data.next;
          // combine the observables and return a list of the results
          return forkJoin(pokeOb);
        })
      );
    }),

    // Combine newly fetched pokemons with the previous list
    // and return the new resulting array.
    scan((prev, current) => {
      return [...prev, ...current];
    }),

    // Use Replay to re-emit the latest value on
    // any further subscriptions
    shareReplay({
      // Only emit the LATEST value, not the whole stream again
      bufferSize: 1,
      // false will keep the stream active altough nobdy is subscribed
      // this ensures that our existing pokemon list won't disappear!
      refCount: false,
    })
  )

  constructor() {
    this.fetchNextPokemons();
  }

  public fetchNextPokemons() {
    // console.log("ha")
    const pokeUrl = this.determineUrl(this.nextUrl);
    this.url$$.next(pokeUrl);

  }

  private determineUrl(url?: string, offset?: number, limit?: number) {
    let pokeUrl = this.pokemonPrefix;
    if (url === undefined) {
      pokeUrl = pokeUrl + '?offset=0&limit=0';
    } else {
      pokeUrl = url;
    }

    return pokeUrl;
  }

  public getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokemonPrefix}/${id}/`;
    return this.http.get<Pokemon>(url).pipe(
    // return this.cacheService.httpWithCache<Pokemon>(url).pipe(
      // clean up function
      catchError(this.handleError<Pokemon>(`gePokemonByID id=${id}`))
    );
  }

  public getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
    // return this.cacheService.httpWithCache<Pokemon>(url).pipe(
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
