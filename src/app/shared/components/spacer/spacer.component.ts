import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacer',
  template: `<div [ngStyle]="style()"></div>`,
})
export class SpacerComponent implements OnInit {
  @Input()
  size: number = 1;

  ngOnInit(): void {
  }

  style() {
    return {
      "margin": `${20 * this.size}px 0`
    };
  }
}
