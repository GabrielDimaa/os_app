import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../button.component";
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-elevated-button',
  templateUrl: './elevated-button.component.html',
  styleUrls: ['./elevated-button.component.scss']
})
export class ElevatedButtonComponent implements ButtonComponent {
  @Input() color: ThemePalette = 'primary';
  @Input() disable: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: string = 'button';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  public onClickEvent(): void {
    this.onClick.emit();
  }
}
