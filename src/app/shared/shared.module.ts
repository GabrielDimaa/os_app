import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material.module";
import { SpacerComponent } from './components/spacer/spacer.component';
import { FullWidthDirective } from './directives/full-width.directive';
import { ElevatedButtonComponent } from './components/buttons/elevated-button/elevated-button.component';
import { OutlinedButtonComponent } from './components/buttons/outlined-button/outlined-button.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SnackbarService } from "./components/snackbar/snackbar.service";
import { LoadingComponent } from './components/loading/spinner/loading.component';
import { LoadingService } from "./components/loading/spinner/loading.service";
import { ShimmerComponent } from './components/loading/shimmer/shimmer.component';
import { DataMaskDirective } from './directives/data-mask.directive';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { ConfirmacaoDialogComponent } from './components/dialogs/confirmacao-dialog/confirmacao-dialog.component';

@NgModule({
  declarations: [
    SpacerComponent,
    FullWidthDirective,
    ElevatedButtonComponent,
    SnackbarComponent,
    LoadingComponent,
    ShimmerComponent,
    DataMaskDirective,
    PhoneMaskDirective,
    ConfirmacaoDialogComponent,
    OutlinedButtonComponent
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
    ElevatedButtonComponent,
    OutlinedButtonComponent,
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
