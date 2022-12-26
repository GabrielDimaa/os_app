import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import LoadingStatus from "./loading-status";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: LoadingStatus
  ) {}

  public event(status: LoadingStatus): void {
    if (status.visivel) {
      this.dialog.open(LoadingComponent, {
        disableClose: true,
        data: status
      });
    } else {
      this.dialog.closeAll();
    }
  }
}
