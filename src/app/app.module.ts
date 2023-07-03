import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PokemonListComponent } from './gallery/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './gallery/pokemon-list/pokemon-item/pokemon-item.component';
import { SearchComponent } from './search/search.component';
import { BackToTopComponent } from './back-to-top/back-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PokemonListComponent,
    PokemonItemComponent,
    SearchComponent,
    BackToTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
