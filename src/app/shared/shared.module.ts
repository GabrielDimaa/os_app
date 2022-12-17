import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { SpacerComponent } from './components/spacer/spacer.component';
import { FullWidthDirective } from './directives/full-width.directive';
import { ButtonIconComponent } from './components/buttons/button-icon/button-icon.component';
import { NgxMaskModule } from "ngx-mask";
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from "./components/snackbar/snackbar.service";

@NgModule({
  declarations: [
    SpacerComponent,
    FullWidthDirective,
    ButtonIconComponent,
    SnackbarComponent
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
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SnackbarComponent,
        SnackbarService
      ]
    };
  }
}
