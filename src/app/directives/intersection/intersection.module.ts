import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntersectionDirective } from './intersection.directive';

@NgModule({
  declarations: [IntersectionDirective],
  imports: [CommonModule],
  exports: [IntersectionDirective],
})
export class IntersectionModule {}
