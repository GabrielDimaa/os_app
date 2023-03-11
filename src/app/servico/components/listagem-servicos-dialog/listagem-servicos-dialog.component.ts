import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import ServicoEntity from "../../entities/servico.entity";

@Component({
  selector: 'app-listagem-servicos-dialog',
  templateUrl: './listagem-servicos-dialog.component.html',
  styleUrls: ['./listagem-servicos-dialog.component.scss']
})
export class ListagemServicosDialogComponent {
  public static configDefault(servicos: ServicoEntity[]): MatDialogConfig {
    return {
      data: servicos,
      width: '600px',
    };
  }

  public servicos: ServicoEntity[] = [];

  constructor(
    private ref: MatDialogRef<ListagemServicosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServicoEntity[]
  ) {
    this.servicos = data ?? [];
  }

  public selecionar = (servico: ServicoEntity): void => this.ref.close(servico);
}
