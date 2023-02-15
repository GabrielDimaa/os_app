import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemServicosDialogComponent } from './components/listagem-servicos-dialog/listagem-servicos-dialog.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ListagemServicosDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ServicoModule {
}
