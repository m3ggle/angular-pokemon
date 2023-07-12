import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { pokemon1 } from 'src/app/data/collection';
import { PokemonItemComponent } from './pokemon-item.component';

describe('PokemonItemComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        PokemonItemComponent,
        RouterTestingModule.withRoutes([
          { path: 'gallery', component: PokemonItemComponent },
          { path: 'pokemon/:id', component: PokemonItemComponent },
        ]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({}) } },
        },
      ],
    })
  );

  it('should create the itself', () => {
    // arrange
    const fixture = TestBed.createComponent(PokemonItemComponent);
    const pokeItem = fixture.componentInstance;

    // act

    // assert
    expect(pokeItem).toBeTruthy();
  });

  it('should render the pokemon name', () => {
    // arrange
    const fixture = TestBed.createComponent(PokemonItemComponent);
    const pokeItem = fixture.componentInstance;
    pokeItem.pokemon = pokemon1;

    // act
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // assert
    expect(compiled.querySelector('span')?.textContent).toContain('Bulbasaur');
  });

  it('should render the pokemon image', () => {
    // arrange
    const fixture = TestBed.createComponent(PokemonItemComponent);
    const pokeItem = fixture.componentInstance;
    pokeItem.pokemon = pokemon1;
    const imgUrl = pokemon1.sprites.front_default;

    // act
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // assert
    expect(compiled.querySelector('img')?.src).toContain(imgUrl);
  });

  // ! blocked by cors
  it('should navigate to the correct URL when clicked', () => {
    // arrange
    const fixture = TestBed.createComponent(PokemonItemComponent);
    const pokeItem = fixture.componentInstance;
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    
    pokeItem.pokemon = pokemon1;
    const expectedUrl = `/pokemon/${pokeItem.pokemon.id}`;

    // act
    spyOn(router, 'navigateByUrl');
    const linkElement = fixture.nativeElement.querySelector('a');
    linkElement.click();

    console.log(router.navigateByUrl);
    expect(router.navigateByUrl).toHaveBeenCalledWith(expectedUrl);
  });
});
