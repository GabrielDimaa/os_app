import { ThemePalette } from "@angular/material/core";

export interface ButtonComponent {
  loading: boolean;
  disable: boolean;
  type: string;
  color: ThemePalette;
}
