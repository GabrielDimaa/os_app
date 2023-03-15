import { ThemePalette } from "@angular/material/core";
import { EventEmitter, Output } from "@angular/core";

export interface ButtonComponent {
  loading: boolean;
  disable: boolean;
  type: string;
  color: ThemePalette;

  onClick: EventEmitter<void>;

  onClickEvent(): void;
}
