import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PokemonDisplayComponent {
  @Input() pokemon!: Pokemon | null;
}
