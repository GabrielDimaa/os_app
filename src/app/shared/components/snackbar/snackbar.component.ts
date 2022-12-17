import { Component, Inject, Input } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from "@angular/material/snack-bar";
import SnackbarConfig from "./snackbar-config";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html'
})
export class SnackbarComponent {
  constructor(private snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarConfig) {}

  public show(config: SnackbarConfig): void {
    this.snackBar.dismiss();
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: config,
      verticalPosition: config.verticalPosition ?? "top",
      horizontalPosition: config.horizontalPosition ?? "right",
      panelClass: config.panelClass ?? ["snackbar-default"],
    });
  }
}
