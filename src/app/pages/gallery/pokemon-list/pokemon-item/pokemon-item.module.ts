import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonItemComponent } from './pokemon-item.component';
import { LazyLoadImageModule } from 'src/app/directives/lazy-load-image/lazy-load-image.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PokemonItemComponent],
  imports: [CommonModule, LazyLoadImageModule, RouterModule.forChild([])],
  exports: [PokemonItemComponent],
})
export class PokemonItemModule {}
