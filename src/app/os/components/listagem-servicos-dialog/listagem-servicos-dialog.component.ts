import { Component, Inject } from '@angular/core';
import { ServicoModel } from "../../models/servico.model";
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-listagem-servicos-dialog',
  templateUrl: './listagem-servicos-dialog.component.html',
  styleUrls: ['./listagem-servicos-dialog.component.scss']
})
export class ListagemServicosDialogComponent {
  public static configDefault(servicos: ServicoModel[]): MatDialogConfig {
    return {
      data: servicos,
      width: '600px',
    };
  }

  public servicos: ServicoModel[] = [];

  constructor(
    private ref: MatDialogRef<ListagemServicosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServicoModel[]
  ) {
    this.servicos = data ?? [];
  }

  public selecionar = (servico: ServicoModel): void => this.ref.close(servico);
}
