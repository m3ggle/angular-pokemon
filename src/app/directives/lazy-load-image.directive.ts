import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, delay, filter } from 'rxjs';

@Directive({
  selector: '[appLazyLoadImage]',
})
export class LazyLoadImageDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 0;
  @Input() threshold = 1;
  @Input() decidingElement: HTMLElement | null = null;
  @Input() imgSrc = '';

  // @Output() visible = new EventEmitter<HTMLElement>();

  private observer: IntersectionObserver | undefined;
  private subject$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  constructor(private element: ElementRef<HTMLImageElement>) {}

  ngOnInit() {
    if (this.decidingElement === null) {
      return;
    }
    this.createObserver();
  }

  // called after the component's view (and child views) has be initialized/rendered
  ngAfterViewInit() {
    this.startObservingElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }

    // this.subject$.next();
    this.subject$.complete();
  }

  private isVisible(element: HTMLElement) {
    return new Promise((resolve) => {
      /*
       - create new intersection observer which has a callback that checks if the target element is fully in view (returns the boolean) and discards it afterwards
       - start observing the target element
       */

      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1); // when target element is fully in view
        observer.disconnect();
      });

      observer.observe(element);
    });
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: this.threshold,
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>
      entry.isIntersecting || entry.intersectionRatio > 0;

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.subject$.next({ entry, observer });
        }
      });
    }, options);
  }

  private startObservingElements() {
    // leave if no observer
    if (!this.observer) {
      return;
    }

    this.observer.observe(this.element.nativeElement); // start observer the target element

    this.subject$
      .pipe(delay(this.debounceTime), filter(Boolean))
      .subscribe(async ({ entry, observer }) => {
        const target = entry.target as HTMLElement;
        const isStillVisible = await this.isVisible(target); // returns true if target element is fully in view

        if (isStillVisible) {
          this.onIntercepted();
          // this.visible.emit();
          // this.visible.emit(target);
          observer.unobserve(target);
        }
      });
  }

  private onIntercepted() {
    this.element.nativeElement.src = this.imgSrc;
  }
}
