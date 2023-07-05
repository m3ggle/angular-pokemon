import { Component, OnInit } from '@angular/core';
import { PokemonsCall } from 'src/app/interfaces/pokemon.interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons();
    this.pokemonService.pokemonsHttp.subscribe(data => console.log(data))

    // result.subscribe((data: PokemonsCall) => {
    //   console.log(data);
    // });
  }

  // async pokemonSecondCall(data: PokemonsCall) {
  //   ge
  // }
}
