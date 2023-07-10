import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackToTopComponent } from 'src/app/generalComponents/back-to-top/back-to-top.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  standalone: true,
  imports: [CommonModule, BackToTopComponent]
})
export class PokemonDetailComponent {

}
