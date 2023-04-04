import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import ClienteEntity from "../entities/cliente.entity";

@Component({
  selector: 'app-info-cliente-dialog',
  templateUrl: './info-cliente-dialog.component.html',
  styleUrls: ['./info-cliente-dialog.component.scss']
})
export class InfoClienteDialogComponent {
  public NAO_INFORMADO: string = "Não informado";

  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: ClienteEntity,
  ) {
  }
}
