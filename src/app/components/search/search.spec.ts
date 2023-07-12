import { TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [],
    })
  );

  it('should create the itself', () => {
    // arrange
    const fixture = TestBed.createComponent(SearchComponent);
    const search = fixture.componentInstance;

    // act

    // assert
    expect(search).toBeTruthy();
  });
});
