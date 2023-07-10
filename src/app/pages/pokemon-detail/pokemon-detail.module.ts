import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PokemonDetailComponent],
  imports: [CommonModule, RouterModule.forChild([
    {
      path: ":id",
      component: PokemonDetailComponent
    }
  ])],
  exports: [PokemonDetailComponent],
})
export class PokemonDetailModule { }
