import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
    ]),
    RouterLink,
  ],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
