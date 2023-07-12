import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { HTTP_CLIENT_TOKEN } from '../app.module';

interface Cache {
  timestamp: string;
  relieved: string;
  data: any;
  request: string;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService implements HttpInterceptor {
  private cache: Cache[] = [];
  // private http = inject(HttpClient);
  private http = inject(HttpClient);

  // todo: make it work -_-
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const cachedRequests = this.cache.filter((call) => call.request === req.url);
      if (cachedRequests.length === 1) {
        return cachedRequests[0].data;
      }

      const requestRef$ = next.handle(req).pipe(shareReplay(1));

      this.cache.push({
        timestamp: Date.now().toString(),
        relieved: '',
        data: requestRef$,
        request: req.url,
      });
      return requestRef$;
    }
    throw new Error('Method not implemented.');
  }

  get(url: string) {
    return this.httpWithCache(url);
  }

  httpWithCache<T>(url: string): Observable<T> {
    const cachedRequests = this.cache.filter((call) => call.request === url);
    if (cachedRequests.length === 1) {
      return of(cachedRequests[0].data);
    }

    return this.http.get<T>(url).pipe(
      tap((response) => {
        this.cache.push({
          timestamp: Date.now().toString(),
          relieved: '',
          data: response,
          request: url,
        });
      })
    );
  }
}
