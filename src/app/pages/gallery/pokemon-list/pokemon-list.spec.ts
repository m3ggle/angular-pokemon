import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { testPokemonHttp } from 'src/app/data/collection';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonListComponent } from './pokemon-list.component';

describe('PokemonListComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [
        PokemonService,
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({}) } },
        },
      ],
    })
  );

  it('should create the itself', () => {
    // arrange
    const fixture = TestBed.createComponent(PokemonListComponent);
    const pokeList = fixture.componentInstance;

    // act

    // assert
    expect(pokeList).toBeTruthy();
  });

  it('should check if a pokemon item renders', () => {
    // assert
    const fixture = TestBed.createComponent(PokemonListComponent);
    const pokeList = fixture.componentInstance;
    pokeList.pokemonList = of(testPokemonHttp.results);

    // act
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // assert
    expect(compiled.querySelector('app-pokemon-item')).toBeTruthy();
  });
  
  it('should check if all pokemon items render', () => {
    // assert
    const fixture = TestBed.createComponent(PokemonListComponent);
    const pokeList = fixture.componentInstance;
    pokeList.pokemonList = of(testPokemonHttp.results);

    // act
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // assert
    expect(compiled.querySelectorAll('app-pokemon-item').length).toBe(testPokemonHttp.results.length);
  });
});
