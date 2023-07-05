import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appIntersection]',
})
export class IntersectionDirective implements OnInit, OnDestroy {
  @Output() onIntersection = new EventEmitter<Boolean>();
  #elementRef = inject(ElementRef)

  ngOnInit(): void {
    // todo: intersection observer implementieren
  }

  ngOnDestroy(): void {
    // todo: intersection observer destroyn
  }
}
