import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CacheService } from './cache.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler } from '@angular/common/http';
import { combineLatest } from 'rxjs';

describe('CacheService', () => {
  // let service: CacheService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          multi: true, // könnten viele interceptoren
          useClass: CacheService
        }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    // service = TestBed.inject(CacheService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should GET request for the pokemon API', done => {
    // Arrange
    const httpClient = TestBed.inject(HttpClient);
    const expectation = "mocked response";
    const url = 'https://www.pokemon.com/api/v2/pokemons';

    // Act
    httpClient.get(url)
      .subscribe(response => {
        // Assert
        expect(response).toEqual(expectation);
        done();
      });

    httpTestingController
      .expectOne(url)
      .flush(expectation);
  })

  it('should GET request for the pokemon API', done => {
    // Arrange
    const httpClient = TestBed.inject(HttpClient);
    const expectation = "mocked response";
    const url = 'https://www.pokemon.com/api/v2/pokemons';

    // Act
    combineLatest([httpClient.get(url), httpClient.get(url), httpClient.get(url)])
      .subscribe(responses => {
        expect(responses.length).toBe(3);
        httpTestingController.verify
        done();
      });

    httpTestingController
      .expectOne(url)
      .flush(expectation, { status: 500, statusText: 'Error'});
  });
});
