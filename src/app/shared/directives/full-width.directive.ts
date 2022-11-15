import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFullWidth]'
})
export class FullWidthDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.width = '100%';
  }
}
