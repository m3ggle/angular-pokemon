import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

// not really isolated
describe('NavbarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule.withRoutes([
          { path: 'gallery', component: NavbarComponent },
          { path: 'pokemon/:id', component: NavbarComponent },
        ]),
      ],
      providers: [
        // Provide a mock ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({}) } },
        },
      ],
    });
  });

  it('should create the itself', () => {
    // arrange
    const fixture = TestBed.createComponent(NavbarComponent);
    const navbar = fixture.componentInstance;

    // act

    // assert
    expect(navbar).toBeTruthy();
  });

  // ! blocked by cors
  it('should have its elements link to the correct page', () => {
    // arrange
    const fixture = TestBed.createComponent(NavbarComponent);
    const navbar = fixture.componentInstance;
    const router = TestBed.inject(Router);
    fixture.detectChanges();

    const route = TestBed.inject(ActivatedRoute)

    // act
    spyOn(router, 'navigateByUrl');
    router.navigate(['/gallery']);

    const expectedUrlPokemon1 = '/pokemon/1';
    const expectedUrlGallery = '/gallery';
    const expectedUrlNotFound = '/not-found';

    const allLinkElements = fixture.nativeElement.querySelectorAll(
      'a'
    ) as HTMLAnchorElement[];
    let linkElementPokemon1: HTMLAnchorElement;
    let linkElementGallery: HTMLAnchorElement;
    let linkElementNotFound: HTMLAnchorElement;

    allLinkElements.forEach((a) => {
      switch (a.innerText) {
        case 'Pokemon 1':
          linkElementPokemon1 = a;
          break;
        case 'Gallery':
          linkElementGallery = a;
          break;
        case 'Not Found':
          linkElementNotFound = a;
          break;
        default:
          break;
      }
    });

    // const linkElementPokemon1 = fixture.nativeElement.querySelectorAll("a").find((a: HTMLAnchorElement) => a.innerText === "Pokemon 1")[0] as HTMLAnchorElement
    // const linkElementGallery = fixture.nativeElement.querySelectorAll("a").find((a: HTMLAnchorElement) => a.innerText === "Gallery")[0] as HTMLAnchorElement
    // const linkElementNotFound = fixture.nativeElement.querySelectorAll("a").find((a: HTMLAnchorElement) => a.innerText === "Not Found")[0] as HTMLAnchorElement

    // const linkElementPokemon1 = fixture.nativeElement.querySelector(
    //   'a:contains("Pokemon 1")'
    // ) as HTMLAnchorElement;
    // const linkElementGallery = fixture.nativeElement.querySelector(
    //   'a:contains("Pokemon 1")'
    // ) as HTMLAnchorElement;
    // const linkElementNotFound = fixture.nativeElement.querySelector(
    //   'a:contains("Pokemon 1")'
    // ) as HTMLAnchorElement;

    // console.log(linkElementPokemon1!)
    // console.log(router.url)

    // assert
    // pokemon details
    // console.log(router.navigateByUrl)
    linkElementPokemon1!.click();
    // console.log(router.url)
    // console.log(router.navigateByUrl)
    expect(router.navigateByUrl)
      .withContext('from gallery to pokemon detail 1')
      .toHaveBeenCalledWith(expectedUrlPokemon1);

    // back to gallery
    linkElementGallery!.click();
    expect(router.navigateByUrl)
      .withContext('from pokemon detail 1 to gallery')
      .toHaveBeenCalledWith(expectedUrlGallery);

    // to not-found
    linkElementNotFound!.click();
    expect(router.navigateByUrl)
      .withContext('from gallery to not found')
      .toHaveBeenCalledWith(expectedUrlNotFound);
  });
});
