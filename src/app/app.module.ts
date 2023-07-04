import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { PokemonListComponent } from './pages/gallery/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './pages/gallery/pokemon-list/pokemon-item/pokemon-item.component';
import { SearchComponent } from './generalComponents/search/search.component';
import { BackToTopComponent } from './generalComponents/back-to-top/back-to-top.component';
import { NavbarComponent } from './generalComponents/navbar/navbar.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PokemonListComponent,
    PokemonItemComponent,
    SearchComponent,
    BackToTopComponent,
    NavbarComponent,
    PokemonDetailComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
