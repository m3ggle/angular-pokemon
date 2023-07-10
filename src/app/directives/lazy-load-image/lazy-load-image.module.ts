import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageDirective } from './lazy-load-image.directive';

@NgModule({
  declarations: [LazyLoadImageDirective],
  imports: [CommonModule],
  exports: [LazyLoadImageDirective],
})
export class LazyLoadImageModule {}
