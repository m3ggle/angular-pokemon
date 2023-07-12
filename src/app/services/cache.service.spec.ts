import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
