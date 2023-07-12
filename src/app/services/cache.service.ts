import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

interface Cache {
  timestamp: string;
  relieved: string;
  data: any;
  request: string;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Cache[] = [];
  private http = inject(HttpClient);

  httpWithCache<T>(url: string): Observable<T> {
    const cachedRequests = this.cache.filter((call) => call.request === url);
    if (cachedRequests.length === 1) {
      return of(cachedRequests[0].data);
    }

    return this.http.get<T>(url).pipe(
      map((response) => {
        this.cache.push({
          timestamp: Date.now().toString(),
          relieved: '',
          data: response,
          request: url,
        });
        console.log("noice")
        return response;
      })
    );
  }
}
