import { EventEmitter, Injectable } from '@angular/core';
import SnackbarConfig from "./snackbar-config";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public channel: EventEmitter<SnackbarConfig> = new EventEmitter<SnackbarConfig>();

  public show(titulo: string, mensagem: string): void {
    this.channel.emit({
      titulo: titulo,
      mensagem: mensagem,
      icon: "info",
      panelClass: ["snackbar-default"],
    });
  }

  public showSuccess(mensagem: string): void {
    this.channel.emit({
      titulo: "Concluído",
      mensagem: mensagem,
      icon: "check_circle",
      panelClass: ["snackbar-success"],
    });
  }

  public showError(error: unknown): void {
    if (error instanceof Error) {
      this.channel.emit({
        titulo: "Ops",
        mensagem: error.message,
        icon: "error",
        panelClass: ["snackbar-error"],
      });
    }
  }
}
