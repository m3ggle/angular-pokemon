import { Injectable } from '@angular/core';
import { Pokemon, PokemonsCall } from '../interfaces/pokemon.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorObserver, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPokemons(
    offset: number = 0,
    limit: number = 20
  ): Observable<PokemonsCall> {
    const url = `${this.pokemonUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonsCall>(url).pipe(
      // clean up function
      (data) => {
        console.log(data)
        console.log("hallo")
        return data
      },
      catchError(
        this.handleError<PokemonsCall>(
          `gePokemons offset=${offset} limit=${limit}`
        )
      )
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      // clean up function
      catchError(this.handleError<Pokemon>(`gePokemon id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
