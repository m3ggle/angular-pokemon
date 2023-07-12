import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from 'src/app/pages/gallery/gallery.component';
import { PokemonService } from 'src/app/services/pokemon.service';
import { BackToTopComponent, WINDOW_TOKEN } from './back-to-top.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// not really isolated
describe('BackToTopComponent', () => {
  let windowFakeRef: any;
  let fixture: ComponentFixture<BackToTopComponent>;
  let component: BackToTopComponent;
  beforeEach(() =>{
    windowFakeRef = {
      scroll: jasmine.createSpy('scroll'),
    };

    TestBed.configureTestingModule({
      imports: [BackToTopComponent],
      providers: [
        {
          provide: WINDOW_TOKEN,
          useValue: windowFakeRef,
        }
      ],
    })

    fixture = TestBed.createComponent(BackToTopComponent);
    component = fixture.componentInstance;
  });

  it('should create the itself', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to 0,0 onMoveToTop', () => {
    component.onMoveToTop();

    expect(windowFakeRef.scroll).toHaveBeenCalledWith(0, 0);
  });

  it('should scroll to 0,0 on', () => {
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click');
    expect(windowFakeRef.scroll).toHaveBeenCalledWith(0, 0);
  });
});
