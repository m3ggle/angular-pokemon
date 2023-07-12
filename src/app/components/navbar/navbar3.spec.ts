import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

//https://www.youtube.com/watch?v=BWjGPR2TYD4

describe('Navbar3', () => {
  let router: Router;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let el: DebugElement; // for accessing the dom element

  beforeEach(waitForAsync(() => {
    // beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([
          { path: '', pathMatch: 'full', redirectTo: '/gallery' },
          { path: 'gallery', component: NavbarComponent },
          { path: 'pokemon/:id', component: NavbarComponent },
        ]),
      ],
      // declarations: [NavbarComponent],
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
  it("should navigate to the default path = '/gallery'", waitForAsync(() => {
    fixture.detectChanges(); // trigger the change detection

    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/gallery');
    });
    // used to resume testing after events triggered async activity or async change detection
  }));

  it('should navigate', waitForAsync(() => {
    fixture.detectChanges();
    let allLinkElements = el.queryAll(By.css('a'));
    const pokemon1Link = allLinkElements.filter(
      (a) => a.nativeElement.innerText === 'Pokemon 1'
    )[0];

    pokemon1Link.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path())
        .withContext('from `/` to `/pokemon/1`')
        .toBe('/pokemon/1');
    });
  }));

  it('should navigate', waitForAsync(() => {
    fixture.detectChanges();
    let allLinkElements = el.queryAll(By.css('a'));
    const notFoundLink = allLinkElements.filter((a) => {
      return a.nativeElement.innerText === 'Not Found';
    })[0];

    notFoundLink.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path())
        .withContext('from `/` to `/not-found`')
        .toBe('/not-found');
    });
  }));

  it('should navigate', waitForAsync(() => {
    fixture.detectChanges();

    let allLinkElements = el.queryAll(By.css('a'));
    const galleryLink = allLinkElements.filter(
      (a) => a.nativeElement.innerText === 'Gallery'
    )[0];

    galleryLink.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(location.path())
        .withContext('from `/` to `/gallery`')
        .toBe('/gallery');
    });
  }));
});
