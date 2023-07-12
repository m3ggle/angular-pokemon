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
  public pokemonsHttp = this.url$$.pipe(
    mergeMap(url => {
      // meat of getting pokemons
    return this.http
      .get<PokemonsCall>(url)
    // this.<PokemonsCall>(pokeUrl)
      .pipe(
        mergeMap((data) => {
          const pokeOb = data.results.map((poke) =>
            this.getPokemonByUrl(poke.url)
          );
          this.nextUrl = data.next;
          return forkJoin(pokeOb);
        })
      );
    }),
    scan((prev, current) => {
      return [...prev, ...current];
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
