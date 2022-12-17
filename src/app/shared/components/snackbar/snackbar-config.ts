import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export default interface SnackbarConfig {
  titulo?: string;
  mensagem: string;
  icon?: string;

  verticalPosition?: MatSnackBarVerticalPosition;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  panelClass?: Array<string>;
}
