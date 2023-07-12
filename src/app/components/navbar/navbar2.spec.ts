import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent2', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create itself', () => {
    expect(component).toBeTruthy();
  });

  it('should have its elements link to the correct page', () => {
    spyOn(router, 'navigateByUrl');

    const expectedUrlPokemon1 = '/pokemon/1';
    const expectedUrlGallery = '/gallery';
    const expectedUrlNotFound = '/not-found';

    const linkElementPokemon1 = fixture.nativeElement.querySelector(
      'a:contains("Pokemon 1")'
    ) as HTMLAnchorElement;
    const linkElementGallery = fixture.nativeElement.querySelector(
      'a:contains("Gallery")'
    ) as HTMLAnchorElement;
    const linkElementNotFound = fixture.nativeElement.querySelector(
      'a:contains("Not Found")'
    ) as HTMLAnchorElement;

    // Pokemon details
    linkElementPokemon1.click();
    expect(router.navigateByUrl)
      .withContext('from gallery to pokemon detail 1')
      .toHaveBeenCalledWith(expectedUrlPokemon1);

    // Back to gallery
    linkElementGallery.click();
    expect(router.navigateByUrl)
      .withContext('from pokemon detail 1 to gallery')
      .toHaveBeenCalledWith(expectedUrlGallery);

    // To not-found
    linkElementNotFound.click();
    expect(router.navigateByUrl)
      .withContext('from gallery to not found')
      .toHaveBeenCalledWith(expectedUrlNotFound);
  });
});
