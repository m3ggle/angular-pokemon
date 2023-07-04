import { Injectable } from '@angular/core';
import {
  Pokemon,
  PokemonsCall,
  PokemonsHttp,
} from '../interfaces/pokemon.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ErrorObserver,
  Observable,
  Subject,
  catchError,
  combineAll,
  combineLatestAll,
  concatMap,
  forkJoin,
  from,
  map,
  of,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  pokemonsHttp = new Subject<PokemonsHttp>();

  constructor(private http: HttpClient) {}

  getPokemons(offset: number = 0, limit: number = 20) {
    const url = `${this.pokemonUrl}?offset=${offset}&limit=${limit}`;
    let pokemonCall: PokemonsCall;
    let pokemons: PokemonsHttp;

    const pokemonObserver = this.http
      .get<PokemonsCall>(url)
      .pipe(
        catchError(
          this.handleError<PokemonsCall>(
            `gePokemons offset=${offset} limit=${limit}`
          )
        )
      )
      .subscribe((data) => {
        // storing for future use
        pokemonCall = data;

        // getting the pokemons from inside the pokemonCall, currently [{name: string, url: string}]
        const unfinishedPokemons = from(data.results);
        // unfinishedPokemons.pipe(
        //   map(pokemonPreview => pokemonPreview.urls)
        //   concatMap(urls => forkJoin(...urls.map((url: string) => this.getPokemonByUrl(url))))
        // )
        const example = from(data.results).pipe(
          map((prev) => this.getPokemonByUrl(prev.url))
        );
        example.pipe(combineLatestAll()).subscribe((data) => {
          pokemons = {
            count: pokemonCall.count,
            next: pokemonCall.next,
            previous: pokemonCall.previous,
            results: data,
          }
          this.pokemonsHttp.next(pokemons)
        });
      });
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
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
