import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonDisplayComponent } from './pokemon-display/pokemon-display.component';

@NgModule({
  declarations: [PokemonDetailComponent],
  imports: [
    CommonModule,
    PokemonDisplayComponent,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: "1"
      },
      {
        path: ':id',
        component: PokemonDetailComponent,
      },
    ]),
  ],
  exports: [PokemonDetailComponent],
})
export class PokemonDetailModule {}
