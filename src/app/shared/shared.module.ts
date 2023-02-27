import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { SpacerComponent } from './components/spacer/spacer.component';
import { FullWidthDirective } from './directives/full-width.directive';
import { ButtonIconComponent } from './components/buttons/button-icon/button-icon.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from "./components/snackbar/snackbar.service";
import { LoadingComponent } from './components/loading/spinner/loading.component';
import { LoadingService } from "./components/loading/spinner/loading.service";
import { ShimmerComponent } from './components/loading/shimmer/shimmer.component';
import { DataMaskDirective } from './components/form-field/data-mask.directive';
import { PhoneMaskDirective } from './components/form-field/phone-mask.directive';
import { ConfirmacaoDialogComponent } from './components/dialogs/confirmacao-dialog/confirmacao-dialog.component';

@NgModule({
  declarations: [
    SpacerComponent,
    FullWidthDirective,
    ButtonIconComponent,
    SnackbarComponent,
    LoadingComponent,
    ShimmerComponent,
    DataMaskDirective,
    PhoneMaskDirective,
    ConfirmacaoDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpacerComponent,
    FullWidthDirective,
    ButtonIconComponent,
    MaterialModule,
    ShimmerComponent,
    DataMaskDirective,
    PhoneMaskDirective,
    LoadingComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SnackbarComponent,
        SnackbarService,
        LoadingComponent,
        LoadingService
      ]
    };
  }
}
