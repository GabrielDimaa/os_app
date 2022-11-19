import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { SpacerComponent } from './components/spacer/spacer.component';
import { FullWidthDirective } from './directives/full-width.directive';
import { ButtonIconComponent } from './components/buttons/button-icon/button-icon.component';
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [
    SpacerComponent,
    FullWidthDirective,
    ButtonIconComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpacerComponent,
    FullWidthDirective,
    ButtonIconComponent,
    MaterialModule,
    NgxMaskModule
  ]
})
export class SharedModule { }
