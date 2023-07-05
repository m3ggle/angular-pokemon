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
  concat,
  from,
  map,
  of,
} from 'rxjs';
import { testPokemonHttp } from '../data/collection';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonPrefix = 'https://pokeapi.co/api/v2/pokemon';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  pokemonsHttp = new Subject<PokemonsHttp>();

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
    // const pokeUrl = `${this.pokemonPrefix}?offset=${offset}&limit=${limit}`;
    let pokemonCall: PokemonsCall;
    // let pokemons: PokemonsHttp;

    this.http
      .get<PokemonsCall>(pokeUrl)
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

        let currentPokemons: Pokemon[] = [];
        this.pokemonsHttp.pipe().subscribe((val) => {
          currentPokemons = [];
          console.log(currentPokemons, val.results);
        });

        console.log('hallo');

        // subscribe to all inner observables and when all are completed writing the result into pokemonsHttp
        unfinishedPokemons.pipe(combineLatestAll()).subscribe((data) => {
          const pokemons: PokemonsHttp = {
            count: pokemonCall.count,
            next: pokemonCall.next,
            previous: pokemonCall.previous,
            results: data,
          };
          this.pokemonsHttp.next(pokemons);
        });

        // trying to turn data.results (current pokemons) into an array
        // of(
        //   this.pokemonsHttp.pipe(
        //     (data: PokemonsHttp) => {
        //       return data.results
        //     }
        //   )
        // )

        // does not work, error: Expected 0-1 arguments, but got 2.
        // combineLatestAll(
        //   of(
        //     this.pokemonsHttp.pipe().subscribe((data) => {
        //       // return data.results;
        //       return testPokemonHttp.results
        //     })
        //   ),
        //   // of(testPokemonHttp.results),
        //   // of(1,2,3),
        //   unfinishedPokemons.pipe(combineLatestAll())
        // ).subscribe((val) => console.log(val));

        concat(
          of(
            this.pokemonsHttp.pipe().subscribe((data) => {
              // return data.results;
              return testPokemonHttp.results;
            })
          ),
          // of(testPokemonHttp.results),
          // of(1,2,3),
          unfinishedPokemons.pipe(combineLatestAll())
        ).subscribe((val) => console.log(val));
      });
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
