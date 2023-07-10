import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { PokemonItemModule } from './pokemon-item/pokemon-item.module';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [CommonModule, PokemonItemModule],
  exports: [PokemonListComponent],
})
export class PokemonListModule { }
