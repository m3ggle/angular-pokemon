import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GalleryComponent } from 'src/app/pages/gallery/gallery.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { BackToTopComponent } from './back-to-top.component';

// not really isolated
describe('BackToTopComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [BackToTopComponent],
      providers: [PokemonService, HttpClient, HttpHandler],
    })
  );

  it('should create the itself', () => {
    // arrange
    const fixture = TestBed.createComponent(BackToTopComponent);
    const btt = fixture.componentInstance;

    // act

    // assert
    expect(btt).toBeTruthy();
  });

  it('#onMoveToTop() should scroll to the top', () => {
    // arrange
    // with gallery component
    const fixture = TestBed.createComponent(GalleryComponent);
    const fixture2 = TestBed.createComponent(BackToTopComponent);
    const gallery = fixture.componentInstance;
    const btt = fixture2.componentInstance;

    // back  alone 
    // const fixture = TestBed.createComponent(BackToTopComponent);
    // const btt = fixture.componentInstance;

    // act
    // change the window scroll position from default (0, 0) to (0, 40) => scroll down
    window.scroll(0, 40); 
    
    // ! for debugging, check if it really changed => does not
    // console.log(window.scrollY)

    // scroll to the top of the window
    // btt.onMoveToTop();

    // assert
    // check if it scrolled down
    expect(window.scrollY).withContext("scrolled down at first").toBe(40);
    
    // check after click if it scrolled to the top
    btt.onMoveToTop()
    expect(window.scrollY).withContext("scrolled to the top after click").toBe(0);
  });
});
