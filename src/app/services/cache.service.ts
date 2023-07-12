import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
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
  private http = inject(HTTP_CLIENT_TOKEN);

  // todo: make it work -_-
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const cachedRequests = this.cache.filter((call) => call.request === req.url);
      if (cachedRequests.length === 1) {
        return of(cachedRequests[0].data);
      }

      return next.handle(req).pipe(
        tap((response) => {
          this.cache.push({
            timestamp: Date.now().toString(),
            relieved: '',
            data: response,
            request: req.url,
          });
        })
      );
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
