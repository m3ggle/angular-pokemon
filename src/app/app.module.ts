import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { CacheService } from './services/cache.service';

// christian havoc
// ermöglischung auf http draufzu greifen
export const HTTP_CLIENT_TOKEN = new InjectionToken<HttpClient>(
  'original http client'
);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NavbarComponent],
  providers: [
    
    
    //* überschreib httpClient
    // {
    //   provide: HttpClient,
    //   useClass: CacheService,
    // },
    
    // speichern original http client, sodass er in cacheService genutzt werden kann
    {
      provide: HTTP_CLIENT_TOKEN,
      useClass: HttpClient,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true, // könnten viele interceptoren 
      useClass: CacheService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
