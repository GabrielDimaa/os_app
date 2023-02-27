import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export type ConfirmacaoDialogData = {
  titulo: string;
  mensagem: string;
}

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.scss']
})
export class ConfirmacaoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacaoDialogData,
  ) {}
}
