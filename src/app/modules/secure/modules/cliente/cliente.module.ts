import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../../shared/shared.module";
import { InfoClienteDialogComponent } from './info-cliente-dialog/info-cliente-dialog.component';

@NgModule({
  declarations: [
    InfoClienteDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ClienteModule {
}
