import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared/shared.module";
import { ListagemEquipamentosDialogComponent } from './components/listagem-equipamentos-dialog/listagem-equipamentos-dialog.component';

@NgModule({
  declarations: [
    ListagemEquipamentosDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EquipamentoModule {
}
