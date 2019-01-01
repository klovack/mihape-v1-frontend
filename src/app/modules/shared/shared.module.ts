import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StringSpacerPipe } from 'src/app/pipes/string-spacer.pipe';
import { LoadingBounceComponent } from 'src/app/components/util/loading-bounce/loading-bounce.component';
import { LoadingCircleComponent } from 'src/app/components/util/loading-circle/loading-circle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StringSpacerPipe,
    LoadingBounceComponent,
    LoadingCircleComponent
  ],
  exports: [
    StringSpacerPipe,
    LoadingBounceComponent,
    LoadingCircleComponent,
  ]
})
export class SharedModule { }
