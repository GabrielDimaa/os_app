import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../../shared/shared.module";
import { CriarEitiTarefaDialogComponent } from "./components/criar-eiti-tarefa-dialog/criar-eiti-tarefa-dialog.component";

@NgModule({
  declarations: [
    CriarEitiTarefaDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EitiModule {
}
