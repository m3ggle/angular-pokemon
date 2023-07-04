import { Injectable } from '@angular/core';
import {
  Pokemon,
  PokemonsCall,
  PokemonsHttp,
} from '../interfaces/pokemon.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  Subject,
  catchError,
  combineLatestAll,
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

    this.http
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

        // turning {name: ..., url} to a valid pokemon information
        // creating needed observable
        const unfinishedPokemons = from(data.results).pipe(
          map((prev) => this.getPokemonByUrl(prev.url))
        );

        // subscribe to all inner observables and when all are completed writing the result into pokemonsHttp
        unfinishedPokemons.pipe(combineLatestAll()).subscribe((data) => {
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
