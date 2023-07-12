import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

//https://www.youtube.com/watch?v=BWjGPR2TYD4

describe('NavbarComponent', () => {
  let router: Router;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let el: DebugElement; // for accessing the dom element

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([
          { path: '', pathMatch: 'full', redirectTo: '/gallery' },
          { path: 'gallery', component: NavbarComponent },
          { path: 'pokemon/:id', component: NavbarComponent },
        ]),
      ],
      providers: [Location],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    fixture = TestBed.createComponent(NavbarComponent);
    el = fixture.debugElement;
  });

  it('should create the itself', () => {
    // arrange
    const navbar = fixture.componentInstance;

    // act

    // assert
    expect(navbar).toBeTruthy();
  });

  // now all about routes
  it("should navigate to the default path = '/gallery'", async () => {
    fixture.detectChanges(); // trigger the change detection

    await fixture.whenStable()

    expect(location.path()).toBe('/gallery');
  });

  it('should navigate', waitForAsync(() => {
    // arrange
    fixture.detectChanges();
    let allLinkElements = el.queryAll(By.css('a'));
    const pokemon1Link = allLinkElements.filter(
      (a) => a.nativeElement.innerText === 'Pokemon 1'
    )[0];

    // act
    pokemon1Link.nativeElement.click();

    // assert
    fixture.whenStable().then(() => {
      expect(location.path())
        .withContext('from `/` to `/pokemon/1`')
        .toBe('/pokemon/1');
    });
  }));

  it('should navigate', waitForAsync(() => {
    // arrange
    fixture.detectChanges();
    let allLinkElements = el.queryAll(By.css('a'));
    const notFoundLink = allLinkElements.filter((a) => {
      return a.nativeElement.innerText === 'Not Found';
    })[0];

    // act
    notFoundLink.nativeElement.click();

    // assert
    fixture.whenStable().then(() => {
      expect(location.path())
        .withContext('from `/` to `/not-found`')
        .toBe('/not-found');
    });
  }));

  it('should navigate', waitForAsync(() => {
    // arrange
    fixture.detectChanges();
    let allLinkElements = el.queryAll(By.css('a'));
    const galleryLink = allLinkElements.filter(
      (a) => a.nativeElement.innerText === 'Gallery'
    )[0];

    // act
    galleryLink.nativeElement.click();

    // assert
    fixture.whenStable().then(() => {
      expect(location.path())
        .withContext('from `/` to `/gallery`')
        .toBe('/gallery');
    });
  }));
});
