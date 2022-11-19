import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spacer',
  template: `<div [ngStyle]="style()"></div>`,
})
export class SpacerComponent {
  @Input()
  size: number = 1;

  style() {
    return {
      "margin": `${20 * this.size}px 0`
    };
  }
}
